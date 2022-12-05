const editProfile = require("./editProfile");
const getProfile = require("./getProfile");

const profileRouter = (router) => {
  getProfile(router);
  editProfile(router);

  return router;
};

module.exports = profileRouter;
