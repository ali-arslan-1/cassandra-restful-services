var express = require('express');
var router = express.Router();

var dataService = require('../services/dataService')();

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

var keyspaceRoute = require('../routes/keyspaces');
router.use('/', keyspaceRoute);

module.exports = router;
