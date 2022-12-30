const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            index: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        profileImage: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
