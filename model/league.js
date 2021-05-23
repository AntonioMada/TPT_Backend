let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let LeagueSchema = Schema({
    id: Number,
    id_sport: Number,
    image: String,
    name:String
});



module.exports = mongoose.model('League', LeagueSchema);