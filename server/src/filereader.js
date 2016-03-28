import {parseString} from 'xml2js';
import Promise from 'promise';
import fs from 'fs';

const filedir = __dirname+'/../data';

const readfile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, {'encoding': 'utf-8'}, (err, filedata) => {
            if(err){ reject(err); }else{
                resolve(filedata);
            }
        });
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

export const getExcersize = (filename) => {
    return readfile(filename)
        .then(transformIntoJs)
        .then(transformIntoViewData);
}

export const getExcersizeDates = () => {
    return getExcersizeFiles().then((filenames) => {
        const filepaths = filenames.map((filename) => __dirname + '/../data/' + filename);
        return Promise.all(filepaths.map(getExcersize)).then((response) => {
            return response.map((item) => {
                return item.date;
            });
        }, (err) => { console.log("Errror:", err); });
    });
}

export const getExcersizeFiles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(filedir, (err, files) => {
            if(err){ reject(err); }else{
                resolve(files);
            }
        });
    });
}
