const { admin } = require("../firebase/firebase");
const { GraphQLError } = require("graphql");
const User = require("../models/user.model");

// verify user auth
exports.checkAuth = async (req) => {
    try {
        if (!req.headers.authorization) {
            throw new GraphQLError("User is not authenticated", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                },
            });
           
        }
        const currentUser = await admin
            .auth()
            .verifyIdToken(req.headers.authorization);
        return currentUser;
    } catch (error) {
        throw new GraphQLError("Forbidden Access!", {
            extensions: {
                code: "FORBIDDEN",
                http: {
                    status: 403,
                },
            },
        });
    }
};

// verify admin
exports.adminAuthCheck = async (currentUser) => {
    try {
        const decodedEmail = currentUser.email;
        console.log(currentUser, "decoded");
        const query = { email: decodedEmail };
        const user = await User.findOne(query).exec();
        if (user?.role !== "admin") {
            throw new GraphQLError("Forbidden Access!", {
                extensions: {
                    code: "FORBIDDEN",
                    http: {
                        status: 403,
                    },
                },
            });
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

exports.authCheckMiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            admin
                .auth()
                .verifyIdToken(req.headers.authorization)
                .then(() => {
                    next();
                })
                .catch((error) => {
                    res.status(401).json({
                        error: error.message,
                    });
                });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};
