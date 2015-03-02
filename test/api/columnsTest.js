/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");
var formatter = require('../../services/formatter');
var column = require('../../models/column');


describe('GET /keyspaces/:keyspace_name/tables/table_name/columns', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            columnName: "dependents",
            keyspaceName: "company",
            tableName: "users",
            type: "regular",
            dataType: "list<text>"
        }
        ];
        JsonResponse.data = data;

        column.getAll = function(keyspaceName,tableName,callback){
            callback(JsonResponse);
        };

        formatter.columnGetResponse = function(){
            return JsonResponse;
        };

        done();
    });

    it('get all columns', function(done){
        //this.timeout(5000);
        request(app)
            .get('/keyspaces/:keyspace_name/tables/table_name/columns')
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


describe('GET /keyspaces/keyspace_name/tables/table_name/columns/column_name', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            columnName: "dependents",
            keyspaceName: "company",
            tableName: "users",
            type: "regular",
            dataType: "list<text>"
        }
        ];
        JsonResponse.data = data;

        column.get = function(keyspaceName,tableName, columnName ,callback){
            callback(JsonResponse);
        };

        formatter.columnGetResponse = function(){
            return JsonResponse;
        };

        done();
    });

    it('get column by name', function(done){
        request(app)
            .get('/keyspaces/keyspace_name/tables/table_name/columns/column_name')
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


describe('DELETE /keyspaces/keyspace_name/tables/table_name/columns/column_name', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "column deleted successfully",
        errorCode: -1

    };
    before(function(done){


        column.drop = function(keyspaceName,tableName,columnName,callback){
            callback(JsonResponse);
        };


        done();
    });

    it('delete column by name', function(done){
        request(app)
            .delete('/keyspaces/keyspace_name/tables/table_name/columns/column_name')
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

describe('POST /keyspaces/keyspace_name/tables/table_name/columns', function(){
    var JsonResponse = {
        success: true,
        data: [],
        message: "column added successfully",
        errorCode: -1

    };

    before(function(done){
        column.create = function(keyspaceName,tableInfo, columnInfo, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('add column', function(done){
        request(app)
            .post('/keyspaces/keyspace_name/tables/table_name/columns')
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
