const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", auth);

module.exports = router;