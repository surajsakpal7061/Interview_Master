const mongoose = require("mongoose");

const blacklisTokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to be added in blacklist. "]
    }
},{
    timestamps: true,
})

const tokenBlackListSchema = mongoose.model("blackListTokens", blacklisTokenSchema);

module.exports = tokenBlackListSchema