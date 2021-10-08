const { Schema, model } = require("mongoose");

const ActivitySchema = Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            "PLAYING",
            "LISTENING",
            "COMPETING",
            "WATCHING"
        ],
        required: true,
        default: "PLAYING"
    }
});

ActivitySchema.set('toJSON', { virtuals: true })

module.exports = model("Activity", ActivitySchema);