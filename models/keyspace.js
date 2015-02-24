/**
 * Created by AliArslan on 22.02.15.
 */

var statement;
var dataService = require('../services/dataService')();
var result = require('../models/result');

exports.getAll = function(callback){
    statement = "SELECT * FROM system.schema_keyspaces;";
    dataService.execute(statement, result(callback).resultCallback);
}

exports.get = function(name,callback){
    statement = "SELECT * FROM system.schema_keyspaces where keyspace_name=?;";

    dataService.execute(statement, result(callback).resultCallback,[name]);

}

exports.create = function(keyspaceName ,strategy ,options,callback){
    var statement = "CREATE KEYSPACE "+keyspaceName+" WITH REPLICATION = { 'class' : '"+strategy+"' ";
    var optionsQuery = ""
    for(index in options){
        optionsQuery  = optionsQuery+", '"+options[index].key+"' : "+options[index].value;
    }
    optionsQuery= optionsQuery + "}"
    statement = statement + optionsQuery;

    dataService.execute(statement, result(callback).resultCallback);
}