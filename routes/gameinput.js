var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('gameinput', { title: 'Game input' });
});

module.exports = router;