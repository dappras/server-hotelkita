const getHome = (router) => {
  router.get("/", function (req, res) {
    res.render("index", { title: "Express" });
  });
};

module.exports = getHome;
