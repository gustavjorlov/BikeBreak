import {parseString} from 'xml2js';
import Promise from 'promise';

export const transformGPX = (xmlContent) => {
    return transformIntoJs(xmlContent).then(transformIntoViewData, (err) => {
        console.log("transformGPX Error", err);
    });
}

const transformIntoJs = (filecontents) => {
    return new Promise((resolve, reject) => {
        parseString(filecontents, (err, result) => {
            if(err){ reject(err); }else{
                resolve(result);
            }
        });
    });
}

const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = _deg2rad(lat2-lat1);
  const dLon = _deg2rad(lon2-lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(_deg2rad(lat1)) * Math.cos(_deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

const _deg2rad = (deg) =>  deg * (Math.PI/180);

const _calculateSpeed = (coord1, coord2, time1, time2) => {
    const distanceInMeters = 1000*getDistanceFromLatLonInKm(coord1.lat, coord1.lon, coord2.lat, coord2.lon);
    const timeInSeconds = ((+new Date(time2)) - (+new Date(time1)))/1000;
    return Math.round(100 * distanceInMeters / timeInSeconds)/100;
}
const _getName = (gpxJsData) => gpxJsData.gpx.trk[0].name[0];
const _getDate = (gpxJsData) => gpxJsData.gpx.metadata ? gpxJsData.gpx.metadata[0].time[0] : gpxJsData.gpx.trk[0].time[0];
const _getTrackPoints = (gpxJsData) => {
    return gpxJsData.gpx.trk[0].trkseg[0].trkpt.map((item, index, ar) => {
        const nextItem = ar[index+1];
        return {
            lat: item.$.lat,
            lon: item.$.lon,
            time: item.time[0],
            heartrate: item.extensions ? item.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:hr'][0] : "",
            elevation: item.ele[0],
            speed: _calculateSpeed({ lat: item.$.lat, lon: item.$.lon }, {
                lat: nextItem ? nextItem.$.lat : null,
                lon: nextItem ? nextItem.$.lon: null
            }, item.time[0], nextItem ? nextItem.time[0] : null)
        };
    });
}
const transformIntoViewData = (gpxJsData) => {
    return {
        name: _getName(gpxJsData),
        date: _getDate(gpxJsData),
        trackpoints: _getTrackPoints(gpxJsData),
        likes: 0
    }
}
