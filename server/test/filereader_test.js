import {expect} from 'chai';
import * as filereader from './../src/filereader';

const filename = __dirname+'/../data/Kompenserar_g_rdagens_tjuvstart_tar_ett_varv_runt_Mj_rn_till_n_r_jag_nd_r_ig_ng.gpx';
const someError = (err) => console.log(":()", err);

describe('File reading test', () => {
    it('should get a nice view data summary object', (done) => {
        filereader.getExcersize(filename).then((viewData) => {
            expect(viewData.name).to.exist;
            expect(viewData.date).to.exist;
            expect(viewData.trackpoints).to.exist;
            expect(viewData.trackpoints).to.be.an('array');
            viewData.trackpoints.forEach((item) => {
                expect(item.lat).to.exist;
                expect(item.lon).to.exist;
                expect(item.time).to.exist;
                expect(item.heartrate).to.exist;
                expect(item.elevation).to.exist;
            });
            done();
        }, someError);
    });
});
