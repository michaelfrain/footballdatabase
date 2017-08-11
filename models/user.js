var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', {
    id: String,
    firstName: String,
    lastName: String,
    role: Number
});