var mongoose = require('mongoose');

module.exports = mongoose.model('Foul', {
    id: String,
    quarter: Number,
    time: Number,
    homeTeam: Boolean,
    foul: String,
    odrk: Number,
    player: Number,
    ado: Number,
    officials: [String],
    comment: String,
    evaluatorComment: String,
    supervisorComment: String,
    game: {type: Schema.Types.ObjectId, ref: 'Game'}
});