const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
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
        role:{
            type: String,
            default: "user"
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
