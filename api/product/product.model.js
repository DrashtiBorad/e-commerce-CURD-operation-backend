const { default: mongoose } = require("mongoose");

const AddProductSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: String,
  category: String,
  // userId: String,
  company: String,
});
module.exports = mongoose.model("product", AddProductSchema);
