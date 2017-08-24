var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Game', {
    id: String,
    date: Date,
    home: { type: Schema.Types.ObjectId, ref: 'Team' },
    visitor: { type: Schema.Types.ObjectId, ref: 'Team' },
    hScore: Number,
    vScore: Number,
    overtime: Boolean,
    nOvertimes: { type: Number, default: 0 },
    totalTime: Number,
    television: Boolean,
    conference: String,
    officials: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    fouls: [{ type: Schema.Types.ObjectId, ref: 'Foul' }]
});