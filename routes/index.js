var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cassandra' });
});


router.get('/fetchData', function(req, res, next) {
    console.log(req.query.query);
    var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'company'});
    client.execute(req.query.query, function (err, result) {
        if (!err) {
            if (result.rows.length > 0) {
                //var user = result.rows[0];
                console.log(result);
                res.send(result);
            } else {
                console.log("No results");
            }
        }else{
            console.log(err);
        }

    });

});

module.exports = router;
