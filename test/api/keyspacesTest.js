/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");

var keyspace = require('../../models/keyspace');


describe('GET /keyspaces', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{keyspace_name:"users",
            durable_writes:true,strategy_class:"org.apache.cassandra.locator.NetworkTopologyStrategy"
            ,strategy_options:{"dc1":"3"}}
        ];
        JsonResponse.data = data;
        keyspace.getAll = function(callback){
            callback(JsonResponse);
        }

        done();
    });

    it('get all keyspaces', function(done){
        //this.timeout(5000);
        request(app)
            .get('/keyspaces')
            .set('Accept', 'application/json')
            .set('connection-name','connection1')
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


describe('GET /keyspaces/keyspace_name', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{keyspace_name:"keyspace_name",
            durable_writes:true,strategy_class:"org.apache.cassandra.locator.NetworkTopologyStrategy"
            ,strategy_options:{"dc1":"3"}}
        ];
        JsonResponse.data = data;
        keyspace.get = function(name, callback){
            callback(JsonResponse);
        }

        done();
    });

    it('get keyspace info by name', function(done){
        //this.timeout(5000);
        request(app)
            .get('/keyspaces/keyspace_name')
            .set('Accept', 'application/json')
            .set('connection-name','connection1')
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});

describe('DELETE /keyspaces/keyspace_name', function(){
    var JsonResponse = {
        success: true,
        data: [],
        message: "Keyspace dropped successfully",
        errorCode: -1

    };
    before(function(done){
        keyspace.drop = function(name, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('drop keyspace', function(done){
        request(app)
            .delete('/keyspaces/keyspace_name')
            .set('Accept', 'application/json')
            .set('connection-name','connection1')
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


describe('POST /keyspaces', function(){
    var JsonResponse = {
        success: true,
        data: [],
        message: "Keyspace created successfully",
        errorCode: -1

    };

    before(function(done){
        keyspace.create = function(keyspaceInfo, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('create keyspace', function(done){
        request(app)
            .post('/keyspaces')
            .set('Accept', 'application/json')
            .set('connection-name','connection1')
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});


describe('GET /execute', function(){

    var JsonResponse = {
        success: false,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{keyspace_name:"users",
            durable_writes:true,strategy_class:"org.apache.cassandra.locator.NetworkTopologyStrategy"
            ,strategy_options:{"dc1":"3"}}
        ];
        JsonResponse.data = data;
        keyspace.execute = function(statement, callback){
            callback(JsonResponse);
        }

        done();
    });

    it('execute a query', function(done){
        request(app)
            .get('/execute?statement=SELECT * FROM system.schema_keyspaces')
            .set('Accept', 'application/json')
            .set('connection-name','connection1')
            .expect('Content-Type', /json/)
            .expect(JsonResponse)
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});