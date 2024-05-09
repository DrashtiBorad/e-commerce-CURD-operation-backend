// require("./connection/config");
// require("dotenv").config();

// const express = require("express");
// const Jwt = require("jsonwebtoken");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// const userController = require("./api/user/user.controller");
// // const userController = require("./api/user/user.controller");

// const User = require("./api/user/user.model");
// const AddProduct = require("./api/product/product.model");
// const useProfile = require("./api/user/user.model");
// const { emailTemplate } = require("./utils/emailTemplete");
// const { verifyToken } = require("./middleware/verifyToken");
// const router = require("./api/api.routes");
// const mailHtml = emailTemplate();
// const app = express();
// const jwtPrivateKey = process.env.JWT_TOKEN_KEY;
// app.use(express.json());
// app.use(cors());
// app.use(router);
// const os=require('os')
// console.log(os.hostname())
// console.log(os.freemem())
// console.log(os.user())

// app.use(verifyToken) applocation level middleware
// const route= express.Router()
// route.use(verifyToken)route level middleware

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("image");

// const verifyToken = (req, res, next) => {
//   let token = req.headers["authorization"];
//   if (token) {
//     token = token.split(" ")[1];
//     Jwt.verify(token, jwtPrivateKey, (error, valid) => {
//       if (error) {
//         res.send({ result: "Please provide valid token with header" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.send({ result: "Please add token with header" });
//   }
//   console.log("token", token);
// };

// app.post("/register", async (req, res) => {
//   let user = new User(req.body);
//   let result = await user.save();
//   result = result.toObject();
//   delete result.password;
//   Jwt.sign({ result }, jwtPrivateKey, { expiresIn: "1h" }, (error, token) => {
//     if (token) {
//       res.send({ result, auth: token });
//     } else if (error) {
//       console.log("error in jwt token", error);
//     }
//   });
// });

// app.post("/login", async (req, res) => {
//   if (req.body.email && req.body.password) {
//     let user = await User.findOne(req.body).select("-password");
//     if (user) {
//       Jwt.sign({ user }, jwtPrivateKey, { expiresIn: "1h" }, (error, token) => {
//         if (token) {
//           res.send({ user, auth: token });
//         } else if (error) {
//           console.log("error in jwt token", error);
//         }
//       });
//     } else {
//       res.send("user is not found");
//     }
//   } else {
//     res.send("user is not found");
//   }
// });

// app.post("/add-product", verifyToken, async (req, res) => {
//   let user = new AddProduct(req.body);
//   let result = await user.save();
//   res.send(result);
// });

// app.get("/get-products", verifyToken, );

// app.delete("/delete-product/:id", verifyToken, async (req, res) => {
//   const result = await AddProduct.deleteOne({ _id: req.params.id });
//   res.send(result);
// });

// app.get("/updateProduct/:id", verifyToken, async (req, res) => {
//   const result = await AddProduct.findOne({ _id: req.params.id });
//   res.send(result);
// });

// app.put("/updateProduct/:id", verifyToken, async (req, res) => {
//   const result = await AddProduct.updateOne(
//     { _id: req.params.id },
//     { $set: req.body }
//   );
//   res.send(result);
// });

// app.get("/search/:key", verifyToken, async (req, res) => {
//   const result = await AddProduct.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { price: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ],
//   });
//   res.send(result);
// });

// app.post("/sendmail", async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.AUTH_USER_EMAIL,
//       pass: process.env.AUTH_USER_PASSWORD,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: process.env.AUTH_USER_EMAIL,
//     to: req.body.email,
//     subject: "reset Password link",
//     html: mailHtml,
//   });
//   res.send(info);
// });

// app.post("/profile", uploadFile, async (req, res) => {
//   const { lastName, firstName, email } = req.body;
//   const imageFileName = req.file.filename;
//   let data = new useProfile({
//     firstName,
//     lastName,
//     email,
//     image: imageFileName,
//   });
//   let result = await data.save();
//   res.send(result);
// });

// app.post("/upload", uploadFile, (req, res) => {
//   res.send("asdas");
// });

// app.listen(5000, () => console.log("server start with port 5000"));
