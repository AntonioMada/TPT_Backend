let mongoose = require("mongoose");

let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let ArticleSchema = Schema({
  id: Number,
  image: String,
  date: Date,
  description: String,
  titre: String,
});

ArticleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("Article", ArticleSchema);  
