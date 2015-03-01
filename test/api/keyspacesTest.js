/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");

var connectionFactory = require('../../services/connectionFactory');
var result = require('../../models/result')();


describe('GET /connections', function(){
    var GetConnectionsJsonResponse;
    before(function(done){
        connectionFactory.getConnections(function(response){
            GetConnectionsJsonResponse = response;
            done();
        });

    });
    it('return all connections', function(done){
        request(app)
            .get('/connections')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(GetConnectionsJsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});

describe('POST /connections', function(){

    var PostConnectionsJsonRequest;
    before(function(done){
        PostConnectionsJsonRequest = {
            connectionInfo: {
                name:"testConnection",
                hosts: [
                    "127.0.0.1"
                ],
                port:9042
            }
        };
        result.setResponse("Connection established successfully",null,true);
        done();
    });

    it('create a connection', function(done){
        request(app)
            .post('/connections')
            .set('Accept', 'application/json')
            .send(PostConnectionsJsonRequest)
            .expect('Content-Type', /json/)
            .expect(result.getResponse())
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


describe('DELETE /connections', function(){

    var PostConnectionsJsonRequest;
    before(function(done){
        PostConnectionsJsonRequest = {
            connectionInfo: {
                name:"testConnection"
            }
        };
        result.setResponse("Connection removed successfully",null,true);
        done();
    });

    it('delete a connection', function(done){
        request(app)
            .delete('/connections')
            .set('Accept', 'application/json')
            .send(PostConnectionsJsonRequest)
            .expect('Content-Type', /json/)
            .expect(result.getResponse())
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


