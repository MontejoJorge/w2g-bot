const { presencePost, announcementPost } = require("../controllers/api");
const { auth, hasRole } = require("../middlewares/auth");
const { presenceValidator, announcementValidator } = require("../middlewares/api/validators");

const router = require("express").Router();

router.use("/", [
    auth,
    hasRole(["admin"])
]);

router.post("/presence", [
    presenceValidator
],presencePost);

router.post("/announcement", [
    announcementValidator
],announcementPost);

module.exports = router;