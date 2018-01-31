let request = require('supertest');
let chai = require('chai');
let sinon  = require('sinon');
let hbs = require('hbs');
let expect = chai.expect;

describe('loading express', function () {

    let server;

    beforeEach(function () {
        server = require('./app');
    });
    /*
    afterEach(function (done) {
        server.close(done);
    });
    */
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
    it('render /userlist', function testPath(done) {
        request(server)
            .get('/userslist')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end(function(err, res) {
                expect(res.text).to.includes('class="id-user');
                expect(res.text).to.includes('class="name-user');
                expect(res.text).to.includes('class="distance-user');
                done();
            });


    });
    it('should calc distante < 100km', function testPath(done) {

        let CalcDistance = require('./modules/calcDistance');
        let dublin = new CalcDistance(53.339428, -6.257664);
        let mullingar = new CalcDistance(53.5333300,-7.3500000);
        let distance = parseFloat((dublin.distanceTo(mullingar) / 1000).toFixed(1));

        expect(distance).to.be.at.most(100);
        done();
    });
    it('should calc distante > 100km', function testPath(done) {

        let CalcDistance = require('./modules/calcDistance');
        let dublin = new CalcDistance(53.339428, -6.257664);
        let belfast = new CalcDistance(54.5833,-5.9333);
        let distance = parseFloat((dublin.distanceTo(belfast) / 1000).toFixed(1));

        expect(distance).to.be.at.least(100);
        done();
    });
});