var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Get Some Food', subject : 'User list generator' });
});

module.exports = router;
