const { verifyToken } = require("../middleware/verifyToken");
const { UploadFile } = require("../fileUpload/fileupload");

const productController = require("./product/product.controller");
const userController = require("./user/user.controller");

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
});

router.get("/get-products", productController.getProduct);
router.post("/register", userController.userRegistration);
router.post("/login", userController.userLogin);
router.post(
  "/add-product",
  verifyToken,
  UploadFile,
  productController.addproducts
);
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
router.put(
  "/updateProduct/:id",
  UploadFile,
  verifyToken,
  productController.updateProduct
);
router.put("/search/:key", verifyToken, productController.getSearchData);
router.post("/sendmail", userController.sendMail);
router.post("/profile", verifyToken, UploadFile, userController.userProfile);
router.get("/categories", productController.getCategories);
router.get(
  "/categories/:category",
  verifyToken,
  productController.getCategoriesData
);
router.post("/generate-otp", userController.generateOtp);
router.post("/verify-otp", userController.verifyOtp);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
