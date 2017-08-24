var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Team', {
    id: String,
    school: String,
    mascot: String,
    lat: Number,
    lon: Number
});