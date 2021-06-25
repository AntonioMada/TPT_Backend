const { Double } = require("bson");
let mongoose = require("mongoose");

let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let MatchSchema = Schema({
  id: Number,
  team_1: Number,
  team_2: Number,
  score_1: Number,
  score_2: Number,
  date_time: Date,
  date: Date,
  time: String,
  quote_team1:Number,
  quote_team2:Number,
  quote_null:Number,
  popularite:Number,
  id_win:Number,
});
MatchSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Matchs", MatchSchema);
