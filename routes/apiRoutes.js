const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

 

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);
router.post('/movies', async (req, res) => {
    try {
        const {title} = req.body
        if (!title) return res.status(400).send('must include title')
        await db.query(
            `INSERT INTO movies (title, on_list) VALUES (?,?)`,
            [title, true]
            )
            res.redirect('/list')
        } catch(err) {
            if (err.code === 'ER_DUP_ENTRY')
            return res.status(409).send('Movie already exists')
            res.status(500).send('error adding movie' + err.message || err.sqlMessage)
        }
    })
module.exports = router;