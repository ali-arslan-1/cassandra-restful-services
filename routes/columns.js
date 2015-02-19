/**
 * Created by AliArslan on 19.02.15.
 */

/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var dataService = require('../services/dataService')();



router.get('/keyspaces/:keyspace_name/tables/:table_name/columns', function(req, res, next) {

    var statement = "SELECT * FROM system.schema_columns where keyspace_name=? AND columnfamily_name=?;";
    console.log("reached here");
    var result = dataService.execute(statement, function(flag,err,result){
        if (err)
            res.send(err);
        else
            res.send(result);
        console.log(result,err);

    },[req.params.keyspace_name,req.params.table_name]);

});

module.exports = router;
