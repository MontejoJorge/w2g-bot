const { suggestionGet } = require("../controllers/dashboard");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", auth);

router.get("/suggestion", suggestionGet);

module.exports = router;