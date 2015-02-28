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


router.post('/connections', function(req, res, next) {


    if(!(req.body.connectionInfo.name) || util.isNullOrEmpty(req.body.connectionInfo.hosts)){
        result.setResponse("Please provide correct request parameters");
        res.status(400);
        res.send(result.getResponse());

    }
    else {
        connectionFactory.connect(req.body.connectionInfo, function (response) {
            if(response.success){
                connectionFactory.saveConnection(req.body.connectionInfo, function(response){
                    res.send(response);
                })
            }else{
                res.send(response);
            }

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

router.delete('/connections', function(req, res, next) {

    connectionFactory.deleteConnection(req.body.connectionInfo.name,function (response, status) {
        status = status?status:200;
        res.status(status);
        res.send(response);
    });

});

var keyspaceRoute = require('../routes/keyspaces');
router.use('/', keyspaceRoute);

module.exports = router;
