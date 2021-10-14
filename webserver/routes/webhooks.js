const { webhookTwitchPost } = require("../controllers/webhooks");

const router = require("express").Router();

router.post("/twitch/callback", webhookTwitchPost);

module.exports = router;