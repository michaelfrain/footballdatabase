var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('gameinput', { title: 'Game input' });
  } else {
    res.render('index', { title: 'Failed auth' });
  }
});

module.exports = router;