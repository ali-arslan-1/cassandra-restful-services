/**
 * Created by AliArslan on 24.02.15.
 */
var statement;
var dataService = require('../services/dataService')();
var result = require('../models/result');
var util  = require('../services/util');


exports.getAll = function(keyspaceName, tableName,sortInfo,callback){

    var orderClause="";
    if(orderClause)
        orderClause = "ORDER BY "+sortInfo.column+" "+sortInfo.order+"";
    statement = "SELECT * FROM "+keyspaceName+"."+tableName+" "+orderClause+" ;";

    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback);

}


exports.add = function(keyspaceName, tableName,recordInfo,callback){

    var columns = "";
    var values = "";

    for(col in recordInfo.columns){
        columns+=" "+recordInfo.columns[col].name+",";
        if(util.commons.isArray(recordInfo.columns[col].value)){
            if(recordInfo.columns[col].type.indexOf("set") > -1){
                values+="{" +util.arrayToString(recordInfo.columns[col].value,false)+"},";
            }else{
                values+="[" +util.arrayToString(recordInfo.columns[col].value,false)+"],";
            }
        }else if(util.commons.isObject(recordInfo.columns[col].value)){
            values += util.replaceAll(JSON.stringify(recordInfo.columns[col].value),'"',"")+",";
        }
        else {
           /* if(util.validator.isNumeric(recordInfo.columns[col].value)
                || util.validator.isUUID(recordInfo.columns[col].value)){
                values+= recordInfo.columns[col].value + ",";
            }else{*/
                values+=""+ recordInfo.columns[col].value + ",";
            //}
        }
    }
    columns = columns.substring(0,columns.length - 1);
    values = values.substring(0,values.length -1);

    var statement = "INSERT INTO "+keyspaceName+"."+tableName+" ( "+columns+") " +
        "VALUES ( "+values+" ) " ;/*+
        "USING TTL 86400;";*/

    console.log( "query : "+statement)
    dataService.execute(statement, result(callback).resultCallback);
}