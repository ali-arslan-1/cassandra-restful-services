/**
 * Created by AliArslan on 19.02.15.
 */

/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var column = require('../models/column');



router.get('/keyspaces/:keyspace_name/tables/:table_name/columns', function(req, res, next) {

    column.getAll(req.params.keyspace_name,req.params.table_name, function(response){
        res.send(response);
    });

});

router.get('/keyspaces/:keyspace_name/tables/:table_name/columns/:column_name', function(req, res, next) {

    column.get(req.params.keyspace_name,req.params.table_name,req.params.column_name, function(response){
        res.send(response);
    });

});

module.exports = router;
