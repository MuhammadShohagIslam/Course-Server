const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
    {
        name: {
            type: String,
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
serviceSchema.index({name: 'text', description: 'text'});

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
