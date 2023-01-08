const { GraphQLError } = require("graphql");
const Blog = require("../../models/blog.model");
const dateScalar = require("../custom-scaler/date.scaler");

// get all blogs
const getAllBlogsHandler = async (parent, args) => {
    try {
        return await Blog.find({}).exec();
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: {
                    status: 500,
                },
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
