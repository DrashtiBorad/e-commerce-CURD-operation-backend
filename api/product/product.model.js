const { default: mongoose } = require("mongoose");

const AddProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  userId: String,
  company: String,
  mobileNo: Number,
});
module.exports = mongoose.model("product", AddProductSchema);
