/**
 * Created by AliArslan on 22.02.15.
 */

var statement;
var dataService = require('../services/dataService')();
var result = require('../models/result');

exports.getAll = function(callback){
    statement = "SELECT * FROM system.schema_keyspaces;";
    var method = util.extractFunctionName(arguments.callee.toString());

    console.log( "query : "+statement)

    dataService.execute(statement, result(callback).resultCallback);
}

exports.get = function(name,callback){
    statement = "SELECT * FROM system.schema_keyspaces where keyspace_name=?;";

    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback,[name]);

}

exports.create = function(keyspaceInfo,callback){

    var keyspaceName = keyspaceInfo.name
    var strategy    = keyspaceInfo.strategy;
    var options = keyspaceInfo.options;

    var statement = "CREATE KEYSPACE "+keyspaceName+" WITH REPLICATION = { 'class' : '"+strategy+"' ";
    var optionsQuery = ""
    for(index in options){
        optionsQuery  = optionsQuery+", '"+options[index].key+"' : "+options[index].value;
    }
    optionsQuery= optionsQuery + "}"
    statement = statement + optionsQuery;

    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback);
}

exports.drop = function(name,callback){
    statement = "DROP KEYSPACE "+name+";";

    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback);

}

exports.execute = function (statement ,callback ){
    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback);
}