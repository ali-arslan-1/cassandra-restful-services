/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");

var connectionFactory = require('../../services/connectionFactory');


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

    var JsonResponse = {
        success: true,
        data: [],
        message: "Connection established successfully",
        errorCode: -1

    };
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
        done();
    });

    it('create a connection', function(done){
        request(app)
            .post('/connections')
            .set('Accept', 'application/json')
            .send(PostConnectionsJsonRequest)
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


describe('DELETE /connections', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "Connection removed successfully",
        errorCode: -1

    };
    var PostConnectionsJsonRequest;
    before(function(done){
        PostConnectionsJsonRequest = {
            connectionInfo: {
                name:"testConnection"
            }
        };
        connectionFactory.deleteConnection  = function(name, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('delete a connection', function(done){
        request(app)
            .delete('/connections')
            .set('Accept', 'application/json')
            .send(PostConnectionsJsonRequest)
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


