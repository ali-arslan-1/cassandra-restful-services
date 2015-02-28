/**
 * Created by AliArslan on 18.02.15.
 */
var express = require('express');
var router = express.Router();

var keyspace = require('../models/keyspace');


router.get('/execute', function(req, res, next) {

    keyspace.execute( req.query.statement, function(response){
        res.send(response);
    });

});

router.get('/keyspaces', function(req, res, next) {

    keyspace.getAll( function(response){
        res.send(response);
    });

});

router.get('/keyspaces/:name', function(req, res, next) {

    keyspace.get(req.params.name, function(response){
        res.send(response);
    });

});

router.post('/keyspaces', function(req, res) {



    keyspace.create(req.body.keyspaceInfo ,function(response){
        response.message = response.success?"Keyspace created successfully":response.message;
        res.send(response);
    });

});

router.delete('/keyspaces/:name', function(req, res, next) {

    keyspace.drop(req.params.name, function(response){
        response.message = response.success?"Keyspace dropped successfully":response.message;
        res.send(response);
    });

});

var tableRoute = require('../routes/tables');
router.use('/', tableRoute);

module.exports = router;
