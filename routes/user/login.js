const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const login = (router) => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({
          success: false,
          msg: "Email Anda Salah!!",
        });
      }

      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        return res.json({
          success: false,
          msg: "Password Anda Salah!!",
        });
      }

      return res.json({
        success: true,
        msg: "Anda Berhasil Login!!",
        token: user.token,
      });
    } catch (e) {
      return res.json({ msg: e.message });
    }
  });
};

module.exports = login;
