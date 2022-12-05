const login = require("./login");
const register = require("./register");

const userRouter = (router) => {
  register(router);
  login(router);

  return router;
};

module.exports = userRouter;
