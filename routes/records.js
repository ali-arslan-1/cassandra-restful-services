/**
 * Created by AliArslan on 24.02.15.
 */

var express = require('express');
var router = express.Router();

var record = require('../models/record');



router.get('/keyspaces/:keyspace_name/tables/:table_name/records', function(req, res, next) {

    record.getAll(req.params.keyspace_name,req.params.table_name,req.params.sortingInfo, function(response){
        res.send(response);
    });

});

router.post('/keyspaces/:keyspace_name/tables/:table_name/records', function(req, res, next) {

    record.add(req.params.keyspace_name,req.params.table_name,req.body.recordInfo,
        function(response){
            response.message = response.success?"Record added successfully":response.message;
            res.send(response);
    });

});

module.exports = router;