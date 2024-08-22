const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please add user name"]
    },
    email: {
        type: String,
        require: [true, "please add user email"],
        unique: [true, "email address already taken"]
    },
    password: {
        type: String,
        require: [true, "please add user password"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("user", userschema);