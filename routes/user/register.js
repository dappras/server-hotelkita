require("dotenv").config;
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (router) => {
  router.post("/register", async (req, res) => {
    const { name, email, password, phoneNumber, role } = req.body;

    try {
      const checkEmail = await User.findOne({ email: email });
      const checkPhone = await User.findOne({ phoneNumber: phoneNumber });
      if (checkEmail) {
        return res.json({
          success: false,
          msg: "Email sudah digunakan!!",
        });
      }

      if (checkPhone) {
        return res.json({
          success: false,
          msg: "Nomor handphone sudah digunakan!!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

      if (role == undefined) {
        const user = await User.create({
          name,
          email,
          password: hashPassword,
          phoneNumber,
          token,
        });

        return res.json({
          success: true,
          msg: "success create data",
          data: user,
        });
      } else {
        const user = await User.create({
          name,
          email,
          password: hashPassword,
          phoneNumber,
          token,
          role: 0,
        });

        return res.json({
          success: true,
          msg: "success create data",
          data: user,
        });
      }
    } catch (e) {
      return res.json({ msg: e.message });
    }
  });
};

module.exports = register;
