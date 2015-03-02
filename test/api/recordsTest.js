/**
 * Created by AliArslan on 01.03.15.
 */

var request = require('supertest');
var app = require("../../app");
var record = require('../../models/record');

describe('GET /keyspaces/:keyspace_name/tables/table_name/records', function(){

    var JsonResponse = {
        success: true,
        data: [],
        message: "",
        errorCode: -1

    };
    before(function(done){
        var data = [{
            firsr_name: "Ali",
            last_name: "Arslan",
            email: "ali@ali.com",
            phone: "3343455"
        }
        ];
        JsonResponse.data = data;

        record.getAll = function(keyspaceName,tableName,sortInfo,callback){
            callback(JsonResponse);
        };


        done();
    });

    it('get all records', function(done){
        request(app)
            .get('/keyspaces/:keyspace_name/tables/table_name/records')
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


describe('POST /keyspaces/:keyspace_name/tables/table_name/records', function(){
    var JsonResponse = {
        success: true,
        data: [],
        message: "column added successfully",
        errorCode: -1

    };

    before(function(done){
        record.add = function(keyspaceName,tableName, recordInfo, callback){
            callback(JsonResponse);
        }
        done();
    });

    it('add record', function(done){
        request(app)
            .post('/keyspaces/:keyspace_name/tables/table_name/records')
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