var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bCrypt = require('bcrypt-nodejs');

module.exports = mongoose.model('User', {
    id: String,
    firstName: String,
    lastName: String,
    role: Number,
    username: String,
    password: String
});