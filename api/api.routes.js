const { verifyToken } = require("../middleware/verifyToken");
const { UploadFile } = require("../fileUpload/fileupload");

const productController = require("./product/product.controller");
const userController = require("./user/user.controller");

const router = require("express").Router();

router.get("/get-products", verifyToken, productController.getProduct);
router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);
router.post("/add-product", verifyToken, productController.addproducts);
router.delete(
  "/delete-product/:id",
  verifyToken,
  productController.deleteProduct
);
router.get(
  "/updateProduct/:id",
  verifyToken,
  productController.getUpdateProducts
);
router.put("/updateProduct/:id", verifyToken, productController.updateProduct);
router.put("/search/:key", verifyToken, productController.getSearchData);
router.post("/sendmail", userController.sendMail);
router.post("/profile", verifyToken, UploadFile, userController.userProfile);
module.exports = router;
