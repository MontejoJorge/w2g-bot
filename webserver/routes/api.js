const { presencePost, announcementPost, suggestionPost } = require("../controllers/api");
const { needAuth, hasRole } = require("../middlewares/auth");
const { presenceValidator, announcementValidator, suggestionValidator } = require("../middlewares/api/validators");

const router = require("express").Router();

router.use("/", needAuth(true));

router.post("/presence", [
    hasRole(["admin"]),
    presenceValidator
],presencePost);

router.post("/announcement", [
    hasRole(["admin"]),
    announcementValidator
],announcementPost);

router.post("/suggestion", [
    suggestionValidator
], suggestionPost);

module.exports = router;