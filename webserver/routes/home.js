const { homeGet } = require("../controllers/home");
const { auth } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/",[
    auth
] , homeGet);

module.exports = router;