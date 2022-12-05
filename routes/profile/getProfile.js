const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const getProfile = (router) => {
  router.post("/get-profile", auth, async (req, res) => {
    try {
      const token = req.token;
      const profile = await User.findOne({ token: token });
      profile.imageUrl = `http://103.23.199.203:3000/${profile.imageUrl}`;
      return res.json({
        success: true,
        msg: "success get data",
        data: profile,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = getProfile;
