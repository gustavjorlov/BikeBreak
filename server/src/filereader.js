import {parseString} from 'xml2js';
import Promise from 'promise';
import fs from 'fs';

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

}

fs.readdir(__dirname+'/../data', (err, contents) => {
    console.log(err, contents);
});

readfile(__dirname+'/../data/Kompenserar_g_rdagens_tjuvstart_tar_ett_varv_runt_Mj_rn_till_n_r_jag_nd_r_ig_ng.gpx').then((filedata) => {
    console.log("filedata", filedata);
}, (err) => {
    console.log("error", err);
})

// parseString(xml, function (err, result) {
//     console.dir(result);
// });
