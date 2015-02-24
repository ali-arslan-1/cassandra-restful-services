/**
 * Created by AliArslan on 18.02.15.
 */

var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var table = require('../models/table');


router.get('/keyspaces/:keyspace_name/tables', function(req, res, next) {

    table.getAll(req.params.keyspace_name, function(response){
        res.send(response);
    });

});

router.get('/keyspaces/:keyspace_name/tables/:table_name', function(req, res, next) {

    table.get(req.params.keyspace_name,req.params.table_name, function(response){
        res.send(response);
    });

});

router.post('/keyspaces/:keyspace_name/tables', function(req, res, next) {

    table.create(req.params.keyspace_name, req.body.name, req.body.columns,
        req.body.primarykeys ,  req.body.clustering_columns,
        function (response) {
            res.send(response);
    });
});

var columnRoute = require('../routes/columns');
router.use('/', columnRoute);


module.exports = router;