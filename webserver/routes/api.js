const { presencePost, announcementPost, suggestionPost } = require("../controllers/api");
const { auth, hasRole } = require("../middlewares/auth");
const { presenceValidator, announcementValidator, suggestionValidator } = require("../middlewares/api/validators");

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

router.post("/suggestion", [
    suggestionValidator
], suggestionPost);

module.exports = router;