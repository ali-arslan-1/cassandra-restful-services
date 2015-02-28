/**
 * Created by AliArslan on 26.02.15.
 */

var _this = this;
var cassandra = require('cassandra-driver');
var result = require('../models/result');
var jf = require('jsonfile');
var file = 'etc/conn.json';

var client;

exports.connect = function(options, callback){

    var clientOptions = {
        contactPoints: options.hosts,
        protocolOptions:{
            port: options.port?options.port:9042
        }

    };

    client = new cassandra.Client(clientOptions);

    client.connect(function(err){
        console.log(err);
        result(callback).connectCallback(err);

    });

}

exports.saveConnection  = function(options,callback){
    console.log("saving connection");
    var saved = false;
    jf.readFile(file, function(err, obj) {
        if(err){
            console.log(err)
            result(callback).connectCallback(null,saved);
        }else{
           for(conn in obj.connections){
                if(obj.connections[conn].name == options.name){
                    obj.connections[conn]= options;
                    saved = true;
                }
           }
           if(!saved){
               obj.connections.push(options);
               saved = true;
           }

            jf.writeFile(file, obj, function(err) {
                if(err){
                    saved = false;
                    console.log(err);
                    result(callback).connectCallback(null,saved);
                }
                else{
                    result(callback).connectCallback(null, saved);
                }
            });
        }
    })
}

exports.getConnections  = function(callback){
    jf.readFile(file, function(err, obj) {
        result = result();
        if(err){
            console.log(err);
            result.setResponse("Error while retrieving connections")
            callback(result.getResponse(), 500);
        }else{
            result.setResponse("Connections retrieved successfully",obj.connections,true);
            callback(result.getResponse());
        }
    });

}

exports.deleteConnection  = function(name, callback){
    var removed = false;
    jf.readFile(file, function(err, obj) {
        if(err){
            console.log(err);
            result().setResponse("Error while deleting connection")
            callback(result().getResponse(), 500);
        }else{
            for(conn in obj.connections){
                if(obj.connections[conn].name == name){
                    obj.connections.splice(conn,conn);
                    removed = true;
                }
            }
            if(removed){
                jf.writeFile(file, obj, function(err) {
                    if(err){
                        console.log(err);
                        result().setResponse("Error while deleting connection")
                        callback(result().getResponse(), 500);
                    }
                    else{
                        result().setResponse("Connection removed successfully",obj.connections,true);
                        callback(result().getResponse());
                    }
                });
            }else{
                result().setResponse("Connection does not exist",obj.connections,true);
                callback(result().getResponse(),404);
            }

        }
    });

}