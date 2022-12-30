const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            index: true,
        },
        description: {
            type: String,
        },
        img: {
            type: String,
        },
        price: {
            type: String,
        },
    },
    { timestamps: true }
);

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
