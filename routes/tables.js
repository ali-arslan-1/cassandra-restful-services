/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var formatter = require('../services/formatter');
var router = express.Router();

var table = require('../models/table');


router.get('/keyspaces/:keyspace_name/tables', function(req, res, next) {

    table.getAll(req.params.keyspace_name, function(response){
        response = formatter.tableGetResponse(response);
        res.send(response);
    });

});

router.get('/keyspaces/:keyspace_name/tables/:table_name', function(req, res, next) {

    table.get(req.params.keyspace_name,req.params.table_name, function(response){
        response = formatter.tableGetResponse(response);
        res.send(response);
    });

});

router.post('/keyspaces/:keyspace_name/tables', function(req, res, next) {

    table.create(req.params.keyspace_name, req.body.tableInfo,
        function (response) {
            res.send(response);
    });
});

router.delete('/keyspaces/:keyspace_name/tables/:table_name', function(req, res, next) {

    table.drop(req.params.keyspace_name,req.params.table_name, function(response){
        res.send(response);
    });

});

var columnRoute = require('../routes/columns');
var recordRoute = require('../routes/records');
router.use('/', columnRoute);
router.use('/', recordRoute);

module.exports = router;