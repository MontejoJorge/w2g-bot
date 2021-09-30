const {  presenceGet } = require("../controllers/dashboard");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", auth);

router.get("/presence", presenceGet);

module.exports = router;