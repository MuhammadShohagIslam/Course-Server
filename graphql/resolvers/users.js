const { GraphQLError } = require("graphql");
const User = require("../../models/user.model");
const { checkAuth } = require("../../helper/checkAuth.helper");


const createNewUserHandler = async (parent, args) => {
    const newUser = new User({
        ...args.input,
    });
    const user = await newUser.save();
    return user;
};

const getAllUsersHandler = async (parent, args) => {
    const users = await User.find({});
    return users;
};

module.exports = {
    Query: {
        allUsers: getAllUsersHandler,
    },
    Mutation:{
        createNewUser: createNewUserHandler
    }
};
