/**
 * Created by AliArslan on 22.02.15.
 */

var statement;
var dataService = require('../services/dataService')();
var result = require('../models/result');
var util  = require('../services/util');

exports.getAll = function(keyspaceName,callback){
    statement = "SELECT * FROM system.schema_columnfamilies where keyspace_name=?;";
    dataService.execute(statement, result(callback).resultCallback,[keyspaceName]);
}

exports.get = function(keyspaceName, tableName,callback){
    statement = "SELECT * FROM system.schema_columnfamilies where keyspace_name=? AND columnfamily_name=? ;";

    dataService.execute(statement, result(callback).resultCallback,[keyspaceName,tableName]);

}

exports.create = function (keyspaceName, tableName, columns, primarykeys,clusteringColumns,callback){


    var columnsStatement = ""
    var clusteringColumnsStatement = "";

    for(index in columns){
        columnsStatement  = columnsStatement+columns[index].name+"  "+columns[index].data_type+" , ";
    }

    if(!clusteringColumns && clusteringColumns.length>0){
        clusteringColumnsStatement = clusteringColumnsStatement + ", "+util.arrayToString(clusteringColumns);
    }

    var keysStatement = " PRIMARY KEY (("+util.arrayToString(primarykeys)+")"+clusteringColumnsStatement+")";

    var statement = "CREATE TABLE "+keyspaceName+"."+tableName+"" +
        "("
        +columnsStatement+
        keysStatement+
        ")";
    console.log("table.create: "+statement);
    dataService.execute(statement, result(callback).resultCallback);
}