let mongoose = require("mongoose");

let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let TeamSchema = Schema({
  id: Number,
  image: String,
  logo: String,
  id_league: Number,
  name: String
});

TeamSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Team", TeamSchema);
