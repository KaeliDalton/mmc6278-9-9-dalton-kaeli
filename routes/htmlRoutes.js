const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get('/pets', controllers.pets.getAll);


router.get("/pets/:id", controllers.pets.get);

module.exports = router;
