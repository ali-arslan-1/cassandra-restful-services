/**
 * Created by AliArslan on 18.02.15.
 */
var cassandra = require('cassandra-driver');

var connectionFactory = require('../services/connectionFactory');


exports.execute =  function(query ,callback,params) {
    var client = connectionFactory.getClientInstance();
    client.execute(query ,params ,function (err, result) {
        if (!err) {
            if (result && result.rows && result.rows.length > 0) {
                callback(true,err,result);
            } else if (result){
                callback(true,null,result);

            }
            else {
                callback(false);
            }
        }else {
            callback(false,err);
        }
    });
}