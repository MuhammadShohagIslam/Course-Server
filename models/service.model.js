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
            url: {
                type: String,
                default: "https://via.placeholder.com/200x200.png?text=Profile",
            },
            public_id: {
                type: String,
                default: `${Date.now()}`,
            }
        },
        price: {
            type: String,
        },
    },
    { timestamps: true }
);
serviceSchema.index({name: 'text'});

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
