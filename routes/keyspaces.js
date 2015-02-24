/**
 * Created by AliArslan on 18.02.15.
 */
var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var dataService = require('../services/dataService')();
var keyspace = require('../models/keyspace');


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
        res.send(response);
    });

});

var tableRoute = require('../routes/tables');
router.use('/', tableRoute);

module.exports = router;
