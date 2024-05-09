const AddProduct = require("../product/product.model");

module.exports.getProduct = async (req, res) => {
  try {
    let user = await AddProduct.find();
    res.json(user);
  } catch (error) {
    throw Error(error);
  }
};

module.exports.addproducts = async (req, res) => {
  try {
    let user = new AddProduct(req.body);
    let result = await user.save();
    res.send(result);
  } catch (error) {
    throw new Error(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const result = await AddProduct.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getUpdateProducts = async (req, res) => {
  try {
    const result = await AddProduct.findOne({ _id: req.params.id });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const result = await AddProduct.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getSearchData = async (req, res) => {
  try {
    const result = await AddProduct.findOne({
      $or: [
        { name: { $regex: req.params.key } },
        { price: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};
