const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
            index: true,
            required: true,
            unique: true,
        },
        image: {
            url: {
                type: String,
                default: "https://via.placeholder.com/200x200.png?text=Profile",
            },
            public_id: {
                type: String,
                default: `${Date.now()}`,
            }
        },
        about: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
