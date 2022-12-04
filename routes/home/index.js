const getHome = require("./getHome");

const homeRouter = (router) => {
  getHome(router);

  return router;
};

module.exports = homeRouter;
