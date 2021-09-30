const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = model('Role', RoleSchema);