const { GraphQLError } = require("graphql");
const { PubSub } = require('graphql-subscriptions')
const Review = require("../../models/review.model");
const { checkAuth } = require("../../helper/checkAuth.helper");
const dateScalar = require("../custom-scaler/date.scaler");
const pubSub = new PubSub()

// create new review
const createNewReviewHandler = async (parent, args) => {
    try {
        const reviewObj = {
            ...args.input,
        };
        const isExitsReview = await Review.find({
            _service: reviewObj.serviceId,
            email: reviewObj.email,
        }).exec();
        if (isExitsReview.length > 0) {
            throw new GraphQLError(
                `You Already Reviewed ${reviewObj.serviceName} Service`,
                {
                    extensions: {
                        code: 400,
                        http: { status: 400 },
                    },
                }
            );
        }
        const newReview = new Review(reviewObj);
        const newReviewSave = await newReview.save();
        pubSub.publish("REVIEW_ADDED", {
            reviewAdded: newReviewSave,
        });
        return newReviewSave;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// get all reviews
const getAllReviewHandler = async (parent, args) => {
    try {
        let reviews;
        if (args.query) {
            reviews = await Review.find({ _service: args.query })
                .sort({ createdAt: -1 })
                .exec();
        } else {
            reviews = await Review.find({}).exec();
        }
        return reviews;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// get all reviews by specific user
const getReviewBySpecificUserHandler = async (parent, args, { req }) => {
    try {
        const decodedUser = await checkAuth(req);
        if (
            decodedUser.name !== args.name ||
            decodedUser.email !== args.email
        ) {
            throw new GraphQLError("Unauthorize Access", {
                extensions: {
                    code: 401,
                    http: { status: 500 },
                },
            });
        }
        if (args.email || args.name) {
            const reviews = await Review.find({ email: args.email }).exec();
            return reviews;
        }
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// get review by reviewId
const getReviewByReviewIdHandler = async (parent, args) => {
    try {
        const query = {
            _id: args.reviewId,
        };
        const review = await Review.findOne(query);
        return review;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// update review by reviewId
const updateReviewByReviewIdHandler = async (parent, args) => {
    try {
        const query = {
            _id: args.reviewId,
        };
        const updateDocument = {
            ...args.input,
        };
        const updatedReview = await Review.updateOne(query, updateDocument);
        return updatedReview;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// delete review by reviewId
const removeReviewByReviewIdHandler = async (parent, args) => {
    try {
        const query = {
            _id: args.reviewId,
        };
        const removedReview = await Review.deleteOne(query);
        return removedReview;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};


module.exports = {
    Date: dateScalar,
    Query: {
        getAllReview: getAllReviewHandler,
        getReview: getReviewByReviewIdHandler,
        getReviewBySpecificUser: getReviewBySpecificUserHandler,
    },
    Mutation: {
        createNewReview: createNewReviewHandler,
        updateReview: updateReviewByReviewIdHandler,
        removeReview: removeReviewByReviewIdHandler,
    },
    Subscription: {
        reviewAdded: {
            subscribe: () => pubSub.asyncIterator(['REVIEW_ADDED'])
        },
    },
};
