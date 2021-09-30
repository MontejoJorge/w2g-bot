const { presencePost } = require("../controllers/api");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", auth);

router.post("/presence", presencePost);

module.exports = router;