/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");
var formatter = require('../../services/formatter');
var table = require('../../models/table');


describe('GET /keyspaces/:keyspace_name/tables', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            tableName: "tableName",
            keyspaceName: "keyspaceName",
            keys: ["key1"]
        }
        ];
        JsonResponse.data = data;

        table.getAll = function(keyspaceName,callback){
            callback(JsonResponse);
        };

        formatter.tableGetResponse = function(){
            return JsonResponse;
        };

        done();
    });

    it('get all tables', function(done){
        //this.timeout(5000);
        request(app)
            .get('/keyspaces/keyspace_name/tables')
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


describe('GET /keyspaces/keyspace_name/tables/table_name', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            tableName: "tableName",
            keyspaceName: "keyspaceName",
            keys: ["key1"]
        }
        ];
        JsonResponse.data = data;

        table.get = function(keyspaceName,tableName,callback){
            callback(JsonResponse);
        };

        formatter.tableGetResponse = function(){
            return JsonResponse;
        };

        done();
    });

    it('get table by name', function(done){
        request(app)
            .get('/keyspaces/keyspace_name/tables/table_name')
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


describe('DELETE /keyspaces/keyspace_name/tables/table_name', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "Table dropped successfully",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            tableName: "tableName",
            keyspaceName: "keyspaceName",
            keys: ["key1"]
        }
        ];
        JsonResponse.data = data;

        table.drop = function(keyspaceName,tableName,callback){
            callback(JsonResponse);
        };

        formatter.tableGetResponse = function(){
            return JsonResponse;
        };

        done();
    });

    it('delete table by name', function(done){
        request(app)
            .delete('/keyspaces/keyspace_name/tables/table_name')
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

describe('POST /keyspaces/keyspace_name/tables', function(){
    var JsonResponse = {
        success: true,
        data: [],
        message: "Table created successfully",
        errorCode: -1

    };

    before(function(done){
        table.create = function(keyspaceName,tableInfo, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('create table', function(done){
        request(app)
            .post('/keyspaces/keyspace_name/tables')
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
