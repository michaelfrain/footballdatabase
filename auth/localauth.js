var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function initialize() {
    passport.initialize();
}

function session() {
    passport.session();
}

passport.serializeUser(function(user, done) {
    console.log('Serializing user ' + user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        console.log('Deserializing user ' + user);
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, callback) {
        User.findByUsername(username, function(err, user) {
            if (err) { return callback(err); }
            if (!user) { return callback(null, false); }
            if (user.password != password) { return callback(null, false); }
            return callback(null, user);
        });
    }
));

module.exports = passport;