let mongoose = require("mongoose");

let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let LeagueSchema = Schema({
  id: Number,
  id_sport: Number,
  image: String,
  name: String,
});

LeagueSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("League", LeagueSchema);
