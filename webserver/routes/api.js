const { presencePost, announcementPost } = require("../controllers/api");
const { auth, hasRole } = require("../middlewares/auth");

const router = require("express").Router();

router.use("/", [
    auth,
    hasRole(["admin"])
]);

router.post("/presence", presencePost);
router.post("/announcement", announcementPost);

module.exports = router;