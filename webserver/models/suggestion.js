const { Schema, model } = require("mongoose");

const suggestionSchema = Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now())
    }
});

module.exports = model('Suggestion', suggestionSchema);