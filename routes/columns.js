/**
 * Created by AliArslan on 19.02.15.
 */

/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var router = express.Router();
var formatter = require('../services/formatter');

var column = require('../models/column');



router.get('/keyspaces/:keyspace_name/tables/:table_name/columns', function(req, res, next) {

    column.getAll(req.params.keyspace_name,req.params.table_name, function(response){
        response = formatter.columnGetResponse(response);
        res.send(response);
    });

});

router.get('/keyspaces/:keyspace_name/tables/:table_name/columns/:column_name', function(req, res, next) {

    column.get(req.params.keyspace_name,req.params.table_name,req.params.column_name, function(response){
        response = formatter.columnGetResponse(response);
        res.send(response);
    });

});

router.post('/keyspaces/:keyspace_name/tables/:table_name/columns', function(req, res, next) {

    column.create(req.params.keyspace_name,req.params.table_name,req.body.columnInfo, function(response){
        response.message = response.success?"column added successfully":response.message;
        res.send(response);
    });

});

router.delete('/keyspaces/:keyspace_name/tables/:table_name/columns/:column_name', function(req, res, next) {

    column.drop(req.params.keyspace_name,req.params.table_name,req.params.column_name, function(response){
        response.message = response.success?"column deleted successfully":response.message;
        res.send(response);
    });

});



module.exports = router;
