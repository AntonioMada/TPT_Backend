
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let MatchSchema = Schema({
    id: Number,
    team_1 : Number,
    team_2: Number,
    score_1: Number,
    score_2: Number,
    date_time:Date,
    date:Date,
    time:String, 
});



// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matchs', MatchSchema);