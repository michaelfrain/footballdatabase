var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('foulcodes', { title: 'Foul code input' });
});

module.exports = router;