const AddProduct = require("../product/product.model");
const path = require("path");

module.exports.getProduct = async (req, res) => {
  try {
    const { page, size } = req.query;
    const skip = (page - 1) * size;
    let Product = await AddProduct.find().skip(skip).limit(size);
    const productsWithImageUrls = Product.map((product) => ({
      ...product.toJSON(),
      image: `http://localhost:5000/uploads/${path.basename(product.image)}`,
    }));
    res.json(productsWithImageUrls);
  } catch (error) {
    throw Error(error);
  }
};

module.exports.addproducts = async (req, res) => {
  try {
    const { body, file } = req;
    const userData = { ...body, image: file.path };
    let user = new AddProduct(userData);
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

module.exports.getCategories = async (req, res) => {
  try {
    const result = await AddProduct.distinct("category");
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getCategoriesData = async (req, res) => {
  try {
    const { category } = req.params;
    const result = await AddProduct.find({ category: category });
    res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};
