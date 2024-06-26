const User = require("../user/user.model");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwtPrivateKey = process.env.JWT_TOKEN_KEY;
const { emailTemplate } = require("../../utils/emailTemplete");
const mailHtml = emailTemplate();
const nodemailer = require("nodemailer");

module.exports.userRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    } else {
      let user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign(
        { result },
        jwtPrivateKey,
        { expiresIn: "1h" },
        (error, token) => {
          if (token) {
            res.json({ result, auth: token });
          } else if (error) {
            console.log("error in jwt token", error);
          }
        }
      );
    }
  } catch (error) {
    throw Error(error);
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign(
          { user },
          jwtPrivateKey,
          { expiresIn: "1h" },
          (error, token) => {
            if (token) {
              res.json({ user, auth: token });
            } else if (error) {
              console.log("error in jwt token", error);
            }
          }
        );
      } else {
        res.send("user is not found");
      }
    } else {
      res.send("user is not found");
    }
  } catch (error) {
    throw Error(error);
  }
};

module.exports.sendMail = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.AUTH_USER_EMAIL,
      to: req.body.email,
      subject: "reset Password link",
      html: mailHtml,
    });
    res.json(info);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.userProfile = async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtPrivateKey, { expiresIn: "1h" }, (error, token) => {
      if (token) {
        res.json({ result, auth: token });
      } else if (error) {
        console.log("error in jwt token", error);
      }
    });
  } catch (error) {
    throw Error(error);
  }
};
