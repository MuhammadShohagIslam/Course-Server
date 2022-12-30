const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const reviewSchema = new Schema(
    {
        serviceName: {
            type: String,
            index: true,
        },
        name:{
            type: String,
            required:true
        },
        img: {
            type: String,
        },
        comment: {
            type: String,
        },
        star: {
            type: Number,
        },
        _service:{
            type: ObjectId,
            ref: "Services"
        }
    },
    { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema);

module.exports = Review;
