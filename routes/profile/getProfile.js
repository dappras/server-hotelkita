const User = require("../../models/user");
const auth = require("../../middlewares/auth");

const getProfile = (router) => {
  router.post("/get-profile", auth, async (req, res) => {
    try {
      const token = req.token;
      const profile = await User.findOne({ token: token });
      if (profile.imageUrl !== undefined) {
        profile.imageUrl = `http://103.226.139.23:3000/${profile.imageUrl}`;
      }
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
