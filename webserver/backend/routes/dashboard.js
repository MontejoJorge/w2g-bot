const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");

router.get("/",[
    isAuth
], function (req, res) {
    res.json(req.user);
});

module.exports = router;