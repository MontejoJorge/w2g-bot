const { suggestionGet } = require("../controllers/dashboard");
const { needAuth } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", needAuth(true));

router.get("/", function(req, res) {
    return res.render("dashboard");
})

router.get("/suggestion", suggestionGet);

module.exports = router;