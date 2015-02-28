/**
 * Created by AliArslan on 28.02.15.
 */

var _this = this;
var util  = require('../services/util');

exports.tableGetResponse  = function(response){
    for(row in response.data){
        var formattedData  = {};
        formattedData.tableName = response.data[row].columnfamily_name;
        formattedData.keyspaceName = response.data[row].keyspace_name;
        formattedData.keys = response.data[row].key_aliases;
        response.data[row] = formattedData;
    }

    return response;
}

exports.columnGetResponse  = function(response){
    for(row in response.data){
        var formattedData  = {};
        var dataType = _this.getColumnDataType(response.data[row].validator);
        if(!dataType){
            dataType = response.data[row].validator;
            var validators = response.data[row].validator.split(/[(,)]+/);
            validators = util.commons.compact(validators);
            var type;
            for(validator in validators){
                type = _this.getColumnDataType(validators[validator])
                dataType = dataType.replace(validators[validator], type);

            }
            dataType = util.replaceAll(dataType,'(','<');
            dataType = util.replaceAll(dataType,')','>');
        }

        formattedData.columnName = response.data[row].column_name;
        formattedData.keyspaceName = response.data[row].keyspace_name;
        formattedData.tableName = response.data[row].columnfamily_name;
        formattedData.type = response.data[row].type;
        formattedData.dataType = dataType;
        response.data[row] = formattedData;
    }

    return response;
}

exports.getColumnDataType = function(validator){

    var dataType;
    switch (validator){
        case "org.apache.cassandra.db.marshal.AsciiType": dataType = "ascii";
            break;
        case "org.apache.cassandra.db.marshal.LongType": dataType = "bigint";
            break;
        case "org.apache.cassandra.db.marshal.BytesType": dataType = "blob";
            break;
        case "org.apache.cassandra.db.marshal.BooleanType": dataType = "boolean";
            break;
        case "org.apache.cassandra.db.marshal.DecimalType": dataType = "decimal";
            break;
        case "org.apache.cassandra.db.marshal.DoubleType": dataType = "double";
            break;
        case "org.apache.cassandra.db.marshal.FloatType": dataType = "float";
            break;
        case "org.apache.cassandra.db.marshal.InetAddressType": dataType = "inet";
            break;
        case "org.apache.cassandra.db.marshal.Int32Type": dataType = "int";
            break;
        case "org.apache.cassandra.db.marshal.ListType": dataType = "list";
            break;
        case "org.apache.cassandra.db.marshal.MapType": dataType = "map";
            break;
        case "org.apache.cassandra.db.marshal.SetType": dataType = "set";
            break;
        case "org.apache.cassandra.db.marshal.UTF8Type": dataType = "text";
            break;
        case "org.apache.cassandra.db.marshal.TimestampType": dataType = "timestamp";
            break;
        case "org.apache.cassandra.db.marshal.TimeUUIDType": dataType = "timeuuid";
            break;
        case "org.apache.cassandra.db.marshal.UUIDType": dataType = "uuid";
            break;
        case "org.apache.cassandra.db.marshal.IntegerType": dataType = "varint";
            break;
    }
    return dataType;
}