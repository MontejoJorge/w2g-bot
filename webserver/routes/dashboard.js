const {  presenceGet } = require("../controllers/dashboard");
const { auth, hasRole } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", [
    auth,
    hasRole(["admin"])
]);

router.get("/presence", presenceGet);

module.exports = router;