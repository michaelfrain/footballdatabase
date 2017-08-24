var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Foulcode', {
    id: String,
    code: String,
    name: String
});