/**
 * Created by AliArslan on 28.02.15.
 */

exports.tableGetResponse  = function(response){
    for(row in response.data){
        var formattedData  = {};
        formattedData.keyspaceName = response.data[row].keyspace_name;
        formattedData.tableName = response.data[row].columnfamily_name;
        formattedData.keys = response.data[row].key_aliases;
        response.data[row] = formattedData;
    }

    return response;
}