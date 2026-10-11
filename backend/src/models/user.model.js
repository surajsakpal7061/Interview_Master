const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Accunt already exists with this emial address"],
        required: true
    },

    password: {
        type: String,
        required: true,
    }
})

const userModle = mongoose.model("users", UserSchema)

module.exports = userModle;