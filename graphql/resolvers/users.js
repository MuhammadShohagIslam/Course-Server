const { GraphQLError } = require("graphql");
const User = require("../../models/user.model");
const { checkAuth, adminAuthCheck } = require("../../helper/checkAuth.helper");

const createOrUpdateNewUserHandler = async (parent, args, { req }) => {
    try {
        // auth checking
        const currentUser = await checkAuth(req);
        const updatedUser = await User.findOneAndUpdate(
            { email: currentUser.email },
            { ...args.input },
            { new: true }
        );

        let user;
        if (updatedUser) {
            user = updatedUser;
        } else {
            const newUser = await new User({
                ...args.input,
            }).save();
            user = newUser;
        }

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
        return (isAdmin = adminCurrent?.role === "admin");
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
        return (isUser = user?.role === "user");
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
        createOrUpdateNewUser: createOrUpdateNewUserHandler,
    },
};
