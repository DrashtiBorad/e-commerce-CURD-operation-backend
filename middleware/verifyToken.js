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
module.exports.generateOtp = async (req, res) => {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const message = await client.messages.create({
      from: process.env.PHONE_NUMBER,
      to: "+918320471689",
      body: `${otpCode}`,
    });
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(req.body.email, { otpCode, expiresAt });
    res.json(message);
  } catch (error) {
    throw Error(error);
  }
};