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

const _getName = (gpxJsData) => gpxJsData.gpx.trk[0].name[0];
const _getDate = (gpxJsData) => gpxJsData.gpx.metadata ? gpxJsData.gpx.metadata[0].time[0] : gpxJsData.gpx.trk[0].time[0];
const _getTrackPoints = (gpxJsData) => {
    return gpxJsData.gpx.trk[0].trkseg[0].trkpt.map((item) => {
        return {
            lat: item.$.lat,
            lon: item.$.lon,
            time: item.time[0],
            heartrate: item.extensions ? item.extensions[0]['gpxtpx:TrackPointExtension'][0]['gpxtpx:hr'][0] : "",
            elevation: item.ele[0]
        };
    });
}
const transformIntoViewData = (gpxJsData) => {
    return {
        name: _getName(gpxJsData),
        date: _getDate(gpxJsData),
        trackpoints: _getTrackPoints(gpxJsData)
    }
}
