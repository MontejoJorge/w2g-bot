const { notifiTwitchStream } = require("../../helpers/notification");
const TwitchWebhook = require("../models/twitchWebhook");

const webhookTwitchPost = (req, res) => {
    
    switch (req.header("Twitch-Eventsub-Message-Type")) {
        case "webhook_callback_verification":
            return res.status(200).send(req.body.challenge);
        break;
        case "notification":
            notifyStream(req.body.subscription.id);
        break;

    }

}

async function notifyStream(id) {

    await TwitchWebhook.find({ id })
        .then((notifications) => {
            notifications.forEach((notification) => {
                //Only notify if last notification is older than 10 mins
                if (notification.last_notification > (new Date() - 10 * 60 * 1000)) return;

                notification.last_notification = new Date();
                notification.save();

                notifiTwitchStream(notification);
            })
        });
}


module.exports = {
    webhookTwitchPost
}