let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let TeamSchema = Schema({
    id: Number,
    image: String,
    logo: String,
    id_league:Number
});


module.exports = mongoose.model('Team', TeamSchema);