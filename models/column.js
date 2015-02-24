/**
 * Created by AliArslan on 22.02.15.
 */

var statement;
var dataService = require('../services/dataService')();
var result = require('../models/result');

exports.getAll = function(keyspaceName,tableName,callback){
    statement = "SELECT * FROM system.schema_columns where keyspace_name=? AND columnfamily_name=?;";
    dataService.execute(statement, result(callback).resultCallback,[keyspaceName,tableName]);
}


exports.get = function(keyspaceName,tableName,columnName,callback){
    statement = "SELECT * FROM system.schema_columns where keyspace_name=? AND columnfamily_name=? AND column_name=?;";
    dataService.execute(statement, result(callback).resultCallback,[keyspaceName,tableName,columnName]);
}