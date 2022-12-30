const { admin } = require("../firebase/firebase");
const { GraphQLError } = require("graphql");

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
