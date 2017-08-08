var mongoose = require('mongoose');
var Foul = 

module.exports = mongoose.model('Game', {
    id: String,
    date: Date,
    home: String,
    visitor: String,
    hScore: Number,
    vScore: Number,
    overtime: Boolean,
    nOvertimes: { type: Number, default: 0 },
    totalTime: Number,
    television: Boolean,
    conference: String,
    officials: [String],
    fouls: [{ type: Schema.Types.ObjectId, ref: 'Foul' }]
});