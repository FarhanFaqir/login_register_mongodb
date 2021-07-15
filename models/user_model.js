const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    contact: {type: String},
    address: {type: String},
    status: {type: Number, default: 1}
});

module.exports = mongoose.model("user", userSchema);
