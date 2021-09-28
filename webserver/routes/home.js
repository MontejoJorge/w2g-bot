const { homeGet } = require("../controllers/home");
const { verifyJWT } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/",[
    verifyJWT
] , homeGet);

module.exports = router;