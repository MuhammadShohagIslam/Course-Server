const User = require("../models/user.model");

const createNewUserController = async (parent, args) => {
    const newUser = new User({
        ...args.input,
    });
    const user = await newUser.save();
    return user;
};

const getAllUsersController = async (parent, args) => {
    const users = await User.find({});
    return users;
};

module.exports = {
    createNewUserController,
    getAllUsersController,
};
