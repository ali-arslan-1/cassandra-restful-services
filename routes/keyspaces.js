/**
 * Created by AliArslan on 18.02.15.
 */
var express = require('express');
var underscore = require('underscore');
var router = express.Router();

var dataService = require('../services/dataService')();



router.get('/keyspaces', function(req, res, next) {

    var statement = "SELECT * FROM system.schema_keyspaces;";

    var result = dataService.execute(statement, function(flag,err,result){
        if (err)
            res.send(err);
        else
            res.send(result);
        console.log(result,err);
    });

});

router.post('/keyspaces', function(req, res) {

    var keyspaceName = req.body.keyspaceName;
    var statement = "CREATE KEYSPACE "+keyspaceName+" WITH REPLICATION = ";

    var strategy = req.body.strategy;
    if(underscore.isEqual(strategy,"SimpleStrategy")){
        var replicationFactor = underscore.isNull(req.body.replicationFactor) ?3:req.body.replicationFactor;
        statement = statement+"{ 'class' : 'SimpleStrategy', 'replication_factor' : "+replicationFactor+" };"

    }else if(underscore.isEqual(strategy,"NetworkTopologyStrategy")){
        var replicationStatement = JSON.stringify(req.body.replicationStatement);
        statement = statement+replicationStatement
    }else {
        res.status(400).send('Invalid input parameters');
    }
    var result = dataService.execute(statement, function(flag,err,result){
        res.send(result);
        console.log(result,err);
    });

});

var tableRoute = require('../routes/tables');
router.use('/', tableRoute);

module.exports = router;
