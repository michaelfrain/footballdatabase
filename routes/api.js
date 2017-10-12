var express = require('express');
var router = express.Router();
var Foul = require('../models/foul');
var Game = require('../models/game');
var User = require('../models/user');
var Grade = require('../models/grade');
var Code = require('../models/foulcode');
var Team = require('../models/team');

router.route('/foulcodes')
.get(function(req, res, next) {
    Code.find({}, function(err, codes) {
        codes.sort(function(a,b) {
            if (a.code > b.code) { return 1; }
            if (a.code < b.code) { return -1; }
            return 0;
        });
        res.json(codes);
    })
})
.post(function(req, res, next) {
    var newCode = new Code();
    
    newCode.code = req.body.foulcode;
    newCode.name = req.body.foulname;
    
    newCode.save(function(err) {
        if (err) {
            console.log('Error saving foul code: ' + err);
            throw err;
        }
        console.log('Saved foul code with id: ' + newCode._id);
        res.json(newCode);
    })
})
router.route('/fouls')
.get(function(req, res, next) {
    if (req.query.user != undefined) {
        var user = req.query.user;
        var fouls = [];
        Game.find({ officials : user })
            .populate({ path: 'fouls', populate: {path : 'foul'}}).populate('home').populate('visitor').populate({path: 'fouls', populate: { path: 'grade' }})
            .exec(function(err, games) {
            for(var i = 0; i < games.length; i++) {
                var game = games[i];
                var positionIndex = game.officials.indexOf(user);
                var position = "";
                if (positionIndex == 0) {
                    position = "R";
                } else if (positionIndex == 1) {
                    position = "U";
                } else if (positionIndex == 2) {
                    position = "H";
                } else if (positionIndex == 3) {
                    position = "L";
                } else if (positionIndex == 4) {
                    position = "F";
                } else if (positionIndex == 5) {
                    position = "S";
                } else if (positionIndex == 6) {
                    position = "B";
                }
                for (var j = 0; j < game.fouls.length; j++) {
                    if (game.fouls[j].officials.indexOf(position) != -1) {
                        let currentFoul = game.fouls[j];
                        fouls.push(currentFoul);  
                    }
                }
            }
            var populatedFouls = [];
            for (var k = 0; k < fouls.length; k++) {
                var currentFoul = fouls[k];
                var tracker = 0
                currentFoul.populate('game')
                           .populate({ path : 'game', populate: [{ path : 'home'}, {path : 'visitor'}]}, function(err, populatedFoul) {
                    if (req.query.foulcode != undefined) {
                        var code = req.query.foulcode;
                        if (code == populatedFoul.foul._id) {
                            populatedFouls.push(populatedFoul);
                        }
                    } else {
                        populatedFouls.push(populatedFoul);
                    }
                    tracker++;
                    if (tracker == fouls.length) {
                        res.json(populatedFouls);
                    }
                }); 
            }
        });
    } else if (req.query.foulcode != undefined) {
        var foulcode = req.query.foulcode;
        Foul.find({ foul : foulcode }).populate('foul').populate('grade').populate({ path: 'game', populate: {path : 'home'}}).populate({ path: 'game', populate: { path : 'visitor'}}).exec(function(err, fouls) {
            res.json(fouls);
        });
    } else if (req.query.game != undefined) {
        var game = req.query.game;
        Game.findOne({ _id : game }).populate({ path: 'fouls', populate: {path : 'foul'}}).populate('home').populate('visitor').populate({path: 'fouls', populate: { path: 'grade' }}).exec(function(err, selectedGame) {
            res.json(selectedGame);
        });
    } else {
        Foul.find({}).populate('foul').populate('grade').populate({ path: 'game', populate: {path : 'home'}}).populate({ path: 'game', populate: { path : 'visitor'}}).exec(function(err, fouls) {
            res.json(fouls);
        });
    }
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
    newFoul.grade = req.body.grade;
    newFoul.hudl = req.body.hudl;
    
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
    Game.find({}).populate('fouls').populate('home').populate('visitor').exec(function(err, games) {
        res.json(games);
    });
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

router.route('/grades')
.get(function(req, res, next) {
    Grade.find({}, function(err, grades) {
        res.json(grades);
    })
})
.post(function(req, res, next) {
    var newGrade = new Grade();
    
    newGrade.abbreviation = req.body.abbreviation;
    newGrade.gradeType = req.body.gradeType;
    newGrade.points = req.body.points;
    
    newGrade.save(function(err) {
        if (err) {
            console.log('Error saving grade: ' + err);
            throw err;
        }
        console.log('Grade created with id: ' + newGrade._id);
        res.json(newGrade);
    })
});

router.route('/teams')
.get(function(req, res, next) {
    Team.find({}, function(err, teams) {
        teams.sort(function(a,b) {
            if (a.school > b.school) { return 1; }
            if (a.school < b.school) { return -1; }
            return 0;
        });
        res.json(teams);
    })
})
.post(function(req, res, next) {
    var newTeam = new Team();
    
    newTeam.school = req.body.school;
    newTeam.mascot = req.body.mascot;
    newTeam.lat = req.body.lat;
    newTeam.lon = req.body.lon;
    
    newTeam.save(function(err) {
        if (err) {
            console.log('Error saving team: ' + err);
            throw err;
        }
        console.log('Team created with id: ' + newTeam._id);
        res.json(newTeam);
    })
});

router.route('/users')
.get(function(req, res, next) {
    User.find({}, function(err, users) {
        users.sort(function(a,b) {
            if (a.lastName > b.lastName) { return 1; }
            if (a.lastName < b.lastName) { return -1; }
            return 0;
        });
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