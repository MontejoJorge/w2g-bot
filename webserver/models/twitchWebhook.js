const { Schema, model, SchemaTypes } = require("mongoose");

const twitchWebhookSchema = Schema({
    user: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    broadcaster_user_id: {
        type: String,
        required: true
    },
    profile_image_url: {
        type: String,
        required: true
    },
    guild_id: {
        type: String,
        required: true
    },
    channel_id: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    last_notification: {
        required: false,
        type: Number,
    }
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now())
    }
});

module.exports = model('TwitchWebhook', twitchWebhookSchema);