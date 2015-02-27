var express = require('express');
var router = express.Router();

var dataService = require('../services/dataService')();
var connectionFactory = require('../services/connectionFactory');
var result = require('../models/result')();
var util = require ('../services/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cassandra' });
});


router.get('/fetchData', function(req, res, next) {
    console.log(req.query.query);
    var result = dataService.execute(req.query.query, function(flag,err,result){
       if(!err)
           res.send(result);
        else res.send(err);
        console.log(result,err);
    });

});

router.post('/connections', function(req, res, next) {

    if(!(req.body.connectionInfo.name) || util.isNullOrEmpty(req.body.connectionInfo.hosts)){
        result.setResponse("Please provide correct request parameters");
        res.status(400);
        res.send(result.getResponse());

    }
    else {
        connectionFactory.connect(req.body.connectionInfo, function (response) {
            res.send(response);
        });
    }
});

router.get('/connections', function(req, res, next) {

    connectionFactory.getConnections(function (response, status) {
        status = status?status:200;
        res.status(status);
        res.send(response);
    });

});

var keyspaceRoute = require('../routes/keyspaces');
router.use('/', keyspaceRoute);

module.exports = router;
