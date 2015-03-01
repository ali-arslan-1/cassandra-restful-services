/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");



describe('GET /connections', function(){
    it('respond with json', function(done){
        request(app)
            .get('/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
})


