const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

//works
router.post ('/pets',
controllers.pets.create
)

router
.route('/pets/:id')
//doesnt display updated info on index
.put(controllers.pets.update)
//works
.delete(controllers.pets.remove)


module.exports = router;
