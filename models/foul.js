var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Foul', {
    id: String,
    quarter: Number,
    time: Number,
    homeTeam: Boolean,
    foul: {type: Schema.Types.ObjectId, ref: 'Foulcode'},
    odrk: Number,
    player: Number,
    ado: Number,
    officials: [String],
    comment: String,
    evaluatorComment: String,
    supervisorComment: String,
    game: {type: Schema.Types.ObjectId, ref: 'Game'},
    grade: {type: Schema.Types.ObjectId, ref: 'Grade'}
});