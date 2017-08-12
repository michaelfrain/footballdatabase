var express = require('express');
var router = express.Router();
var Foul = require('../models/foul');
var Game = require('../models/game');
var User = require('../models/user');

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
    newFoul.homeTeam = req.body.homeTeam;
    newFoul.foul = req.body.foul;
    newFoul.odrk = req.body.odrk;
    newFoul.player = req.body.player;
    newFoul.ado = req.body.ado;
    newFoul.officials = req.body.officials;
    newFoul.comment = req.body.comment;
    newFoul.evaluatorComment = req.body.evaluatorComment;
    newFoul.supervisorComment = req.body.supervisorComment;
    newFoul.game = req.body.game;
    
    newFoul.save(function(err) {
        if (err) {
            console.log('Error saving foul: ' + err);
            throw err;
        }
        console.log('Foul created with id: ' + newFoul._id);
        res.json(newFoul);
    });
});

router.route('/games')
.get(function(req, res, next) {
    Game.find({}, function(err, games) {
        res.json(games);
    })
})
.post(function(req, res, next) {
    var newGame = new Game();
    
    var date = Date.parse(req.body.date);
    console.log(date);
    if (isNaN(date)) {
        newGame.date = Date.now();
    } else {
        newGame.date = date;
    }
    newGame.home = req.body.home;
    newGame.visitor = req.body.visitor;
    newGame.hScore = req.body.hScore;
    newGame.vScore = req.body.vScore;
    newGame.overtime = req.body.nOvertimes > 0;
    newGame.nOvertimes = req.body.nOvertimes;
    newGame.totalTime = req.body.totalTime;
    newGame.television = req.body.television;
    newGame.conference = req.body.conference;
    newGame.officials = req.body.officials;
    
    newGame.save(function(err) {
        if (err) {
            console.log('Error saving game: ' + err);
            throw err;
        }
        console.log('Game created with id: ' + newGame._id);
        res.json(newGame);
    })
});

router.route('/games/:gameId')
.get(function(req, res, next) {
    Game.findById(req.params.gameId, function(err, game) {
        if (err) {
            console.log('Could not find game id: ' + req.params.gameId);
            throw err;
        }
        res.json(game);
    });
})
.put(function(req, res, next) {
    Game.findById(req.params.gameId, function(err, game) {
        if (err) {
            console.log('Could not find game id for put: ' + req.params.gameId);
            throw err;
        }
        game.fouls = req.body.fouls;
        game.save(function(err) {
            if (err) {
                console.log('Error updating game: ' + err);
                throw err;
            }
            console.log('Game updated with id: ' + game._id);
            res.json(game);
        });
    });
});

router.route('/users')
.get(function(req, res, next) {
    User.find({}, function(err, users) {
        res.json(users);
    })
})
.post(function(req, res, next) {
    var newUser = new User();
    
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.role = req.body.role;
    
    newUser.save(function(err) {
        if (err) {
            console.log('Error saving user: ' + err);
            throw err;
        }
        console.log('User created with id: ' + newUser._id);
        res.json(newUser);
    });
});

module.exports = router;