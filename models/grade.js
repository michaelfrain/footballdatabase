var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Grade', {
    id: String,
    abbreviation: String,
    gradeType: String,
    points: Number
});