const User = require("../user/user.model");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const twilio = require("twilio");
dotenv.config();
const jwtPrivateKey = process.env.JWT_TOKEN_KEY;
const { emailTemplate } = require("../../utils/emailTemplete");
const mailHtml = emailTemplate();
const nodemailer = require("nodemailer");
const otpStore = new Map();
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

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

module.exports.generateOtp = async (req, res) => {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER_EMAIL,
        pass: process.env.AUTH_USER_PASSWORD,
      },
    });
    let info = 0;
    if (req.body.otpSendType === "email") {
      console.log("email");
      info = await transporter.sendMail({
        from: process.env.AUTH_USER_EMAIL,
        to: req.body.email,
        subject: "reset Password link",
        text: `OTP is ${otpCode}`,
      });
    } else if (req.body.otpSendType === "phone") {
      console.log("Phone");

      info = await client.messages.create({
        from: process.env.PHONE_NUMBER,
        to: "+918320471689",
        body: `${otpCode}`,
      });
    }

    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(req.body.email, { otpCode, expiresAt });
    res.json(info);
  } catch (error) {
    throw Error(error);
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const storeOtp = otpStore.get(email);
    if (!storeOtp) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    if (Date.now() > storeOtp.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP expired" });
    }
    if (otpCode == storeOtp.otpCode) {
      otpStore.delete(email);
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    throw Error(error);
  }
};

module.exports.resetPassword = async (req, res) => {
  const { email, mobileNumber, newPassword } = req.body;

  let user;
  if (email) {
    user = await User.findOneAndUpdate({ email }, { password: newPassword });
  }
  if (mobileNumber) {
    user = await User.findOneAndUpdate({ mobileNo }, { password: newPassword });
  }
  if (user.password === newPassword) {
    return res.status(400).json({
      error: "New password must be different from the current password",
    });
  }
  if (!user) {
    return res.status(400).json({
      error: "User not found.",
    });
  }
  res.json({ message: "Password Updated Successfully" });
};
