const { GraphQLError } = require("graphql");
const User = require("../../models/user.model");
const { checkAuth, adminAuthCheck } = require("../../helper/checkAuth.helper");

const createNewUserHandler = async (parent, args) => {
    const isExistUser = await User.findOne({
        email: args.email,
    });
    if (isExistUser) {
        throw new GraphQLError("User Already Exits!", {
            extensions: {
                code: "FORBIDDEN",
                http: {
                    status: 400,
                },
            },
        });
    }
    const newUser = new User({
        ...args.input,
    });
    const user = await newUser.save();
    return user;
};

// get all user by user role
const getAllUsersByRoleHandler = async (parent, args, { req }) => {
    try {
        // auth checking
        const currentUser = await checkAuth(req);
        // admin checking
        const adminCurrent = await adminAuthCheck(currentUser);
        let users;
        if (adminCurrent) {
            users = await User.find({ role: "user" }).exec();
        }
        return users;
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

const getAdminUserHandler = async (parent, args, { req }) => {
    try {
        // auth checking
        const currentUser = await checkAuth(req);
        // admin checking
        const adminCurrent = await adminAuthCheck(currentUser);
        return isAdmin = adminCurrent?.role === "admin";
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
const getUserHandler = async (parent, args, { req }) => {
    try {
        // auth checking
        const currentUser = await checkAuth(req);
        const user = await User.findOne({ email: currentUser.email }).exec();
        return isUser = user?.role === "user";
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
const getCurrentUserHandler = async (parent, args, { req }) => {
    try {
        // auth checking
        const currentUser = await checkAuth(req);
        const user = await User.findOne({ email: currentUser.email }).exec();
        return user;
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
    Query: {
        allUsersByRole: getAllUsersByRoleHandler,
        currentUser: getCurrentUserHandler,
        getAdminUser: getAdminUserHandler,
        getUser: getUserHandler,

    },
    Mutation: {
        createNewUser: createNewUserHandler,
    },
};
