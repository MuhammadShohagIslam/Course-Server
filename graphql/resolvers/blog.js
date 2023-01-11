const { GraphQLError } = require("graphql");
const Blog = require("../../models/blog.model");
const dateScalar = require("../custom-scaler/date.scaler");

// get all blogs
const getAllBlogsHandler = async (parent, args) => {
    try {
        return await Blog.find({}).exec();
    } catch (error) {
        throw new GraphQLError(error.message || "Server Error", {
            extensions: {
                code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            },
        });
    }
};

module.exports = {
    Date: dateScalar,
    Query: {
        getAllBlogs: getAllBlogsHandler,
    },
};
