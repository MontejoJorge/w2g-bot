const {  presenceGet, announcementGet } = require("../controllers/dashboard");
const { needAuth, hasRole } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", [
    needAuth(true),
    hasRole(["admin"])
]);

router.get("/presence", presenceGet);

router.get("/announcement", announcementGet);

module.exports = router;