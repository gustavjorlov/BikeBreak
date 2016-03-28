import {expect} from 'chai';
import {getExcersize, getExcersizeFiles, getExcersizeDates} from './../src/filereader';
import Promise from 'promise';

const someError = (err) => console.log(":()", err);

describe('File reading test', () => {
    it('should get the exersize files from the directory', (done) => {
        getExcersizeFiles().then((files) => {
            expect(files).to.exist;
            expect(files).to.be.an.array;
            files.forEach((item) => expect(item.substr(-4)).to.equal('.gpx'));
            done();
        });
    });

    it('should get a list of the dates of the exersizes', (done) => {
        getExcersizeDates().then((dates) => {
            expect(dates).to.be.an('array');
            done();
        }, someError);
    });
    
    it('should get a nice view data summary object', (done) => {
        const testExersize = (exersize) => {
            expect(exersize.name).to.exist;
            expect(exersize.date).to.exist;
            expect(exersize.trackpoints).to.exist;
            expect(exersize.trackpoints).to.be.an('array');
            exersize.trackpoints.forEach((item) => {
                expect(item.lat).to.exist;
                expect(item.lon).to.exist;
                expect(item.time).to.exist;
                expect(item.heartrate).to.exist;
                expect(item.elevation).to.exist;
            });
        };
        getExcersizeFiles().then((filenames) => {
            const filepaths = filenames.map((filename) => __dirname + '/../data/' + filename);
            Promise.all(filepaths.map(getExcersize)).then((response) => {
                response.forEach(testExersize);
                done();
            }, someError);
        });
    });
});
