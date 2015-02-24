/**
 * Created by AliArslan on 18.02.15.
 */
var express = require('express');
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});

module.exports = function(contactPoints) {
    return {
        execute: function(query ,callback,params) {
            client.execute(query ,params ,function (err, result) {
                if (!err) {
                    if (result && result.rows && result.rows.length > 0) {
                        //var user = result.rows[0];
                        callback(true,err,result);
                    } else if (result){
                        callback(true,null,result);
                        /*if(result.schemaChange){

                        }*/
                    }
                    else {
                        callback(false);
                    }
                }else {
                    callback(false,err);
                }
            });
        }
    };
}