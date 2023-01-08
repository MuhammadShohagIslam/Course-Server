const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const reviewSchema = new Schema(
    {
        comment: {
            type: String,
        },
        star: {
            type: Number,
        },
        _user: {
            type: ObjectId,
            ref: "Users"
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
