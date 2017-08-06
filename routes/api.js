var express = require('express');
var router = express.Router();
var Foul = require('../models/foul');

router.route('/fouls')
.get(function(req, res, next) {
    Foul.find({}, function(err, fouls) {
        res.json(fouls);
    });
})
.post(function(req, res, next) {
    var newFoul = new Foul();
    
    newFoul.quarter = req.body.quarter;
    newFoul.time = req.body.time;
    newFoul.homeTeam = true;
    newFoul.foul = req.body.foul;
    newFoul.odrk = 0
    newFoul.player = req.body.player;
    newFoul.ado = 0
    newFoul.officials = [req.body.officials];
    newFoul.comment = req.body.comment;
    newFoul.evaluatorComment = req.body.evaluatorComment;
    newFoul.supervisorComment = req.body.supervisorComment;
    
    newFoul.save(function(err) {
        if (err) {
            console.log('Error saving foul: ' + err);
            throw err;
        }
        console.log('Foul created with id: ' + newFoul.id);
        res.json(newFoul);
    });
});

module.exports = router;