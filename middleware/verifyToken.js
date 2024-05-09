const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");

dotenv.config();
const jwtPrivateKey = process.env.JWT_TOKEN_KEY;

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtPrivateKey, (error, valid) => {
      if (error) {
        res.send({ result: "Please provide valid token with header" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "Please add token with header" });
  }
};
