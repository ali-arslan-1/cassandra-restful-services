/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var dataService = require('../services/dataService')();



router.get('/keyspaces/:keyspace_name/tables', function(req, res, next) {

    var statement = "SELECT columnfamily_name FROM system.schema_columnfamilies where keyspace_name=?";
    var result = dataService.execute(statement, function(flag,err,result){
        if (err)
            res.send(err);
        else
            res.send(result);
        console.log(result,err);

    },[req.params.keyspace_name]);

});

var columnRoute = require('../routes/columns');
router.use('/', columnRoute);


module.exports = router;