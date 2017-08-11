var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('userinput', { title: 'User Input' });
});

module.exports = router;