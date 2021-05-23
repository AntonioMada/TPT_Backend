let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let SportSchema = Schema({
    id: Number,
    image: String,
    name: String
});



// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Sport', SportSchema);