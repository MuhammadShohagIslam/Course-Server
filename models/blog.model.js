const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        author:{
            type: String
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blogs", blogSchema);

module.exports = Blog;
