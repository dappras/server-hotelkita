const addCategory = require("./addCategory");
const deleteCategory = require("./deleteCategory");
const editCategory = require("./editCategory");
const getCategory = require("./getCategory");
const getDetailCategory = require("./getDetailCategory");
const hotelByCategory = require("./hotelByCategory");

const categoryRouter = (router) => {
  getCategory(router);
  getDetailCategory(router);
  addCategory(router);
  editCategory(router);
  deleteCategory(router);
  hotelByCategory(router);

  return router;
};

module.exports = categoryRouter;
