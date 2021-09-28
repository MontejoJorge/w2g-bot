const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: "user",
        required: true
    },
    enabled: {
        type: Boolean,
        default: true
    },
    discordId: {
        type: String,
        required: true,
        unique: true
    },
    discordDiscriminator: {
        type: Number,
        required: true
    },
    createdAt: Number,
    updatedAt: Number,
}, {
    timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000)
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...user } = this.toObject();
    user.id = _id;

    return user;
}

module.exports = model("User", UserSchema);