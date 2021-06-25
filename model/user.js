let mongoose = require("mongoose");
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const UserSchema = Schema({
  id: Number,
  email: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  address: { type: String },
  birthday: { type: Date, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  isEnable:{ type: Boolean, required: true }
});
UserSchema.plugin(aggregatePaginate);

module.exports = mongoose.model("User", UserSchema);
