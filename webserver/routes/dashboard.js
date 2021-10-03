const {  presenceGet, announcementGet } = require("../controllers/dashboard");
const { auth, hasRole } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", [
    auth,
    hasRole(["admin"])
]);

router.get("/presence", presenceGet);
router.get("/announcement", announcementGet);

module.exports = router;