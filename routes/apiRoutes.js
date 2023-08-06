const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


router.post ('/pets',
controllers.pets.create
)

router
.route('/pets/:id')
.put(controllers.pets.update)
.delete(controllers.pets.remove)


module.exports = router;
