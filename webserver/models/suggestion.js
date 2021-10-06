const { Schema, model } = require("mongoose");

const suggestionSchema = Schema({
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