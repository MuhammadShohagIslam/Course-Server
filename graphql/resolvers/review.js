const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const Review = require("../../models/review.model");
const User = require("../../models/user.model");
const { checkAuth } = require("../../helper/checkAuth.helper");
const dateScalar = require("../custom-scaler/date.scaler");
const pubsub = new PubSub();

// create new review
const createNewReviewHandler = async (parent, args) => {
    try {
        const user = await User.findOne({ email: args.input.email }).exec();

        const isExitsReview = await Review.findOne({
            _user: user._id,
            _service: args.input.serviceId,
        })
            .populate("_service")
            .populate("_user")
            .exec();

        if (isExitsReview) {
            throw new GraphQLError(
                `You Already Reviewed ${isExitsReview._service.name} Service`,
                {
                    extensions: {
                        code: 400,
                        http: { status: 400 },
                    },
                }
            );
        }
        const reviewObj = {
            _service: args.input.serviceId,
            _user: user._id,
            comment: args.input.comment,
            star: args.input.star,
        };
        const newReview = await new Review(reviewObj)
            .save()
            .then((u) => u.populate("_user"))
            .then((s) => s.populate("_service"));

        pubsub.publish("ADDED_REVIEW", {
            addedReview: newReview,
        });
        return newReview;
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
                .populate("_user")
                .populate("_service")
                .sort({ createdAt: -1 })
                .exec();
        } else {
            reviews = await Review.find({})
                .populate("_user")
                .populate("_service")
                .exec();
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
                    http: { status: 401 },
                },
            });
        }
        if (args.email || args.name) {
            const user = await User.findOne({ email: args.email }).exec();
            const reviews = await Review.find({ _user: user._id })
                .populate("_service")
                .populate("_user")
                .exec();
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
        const review = await Review.findOne(query)
            .populate("_service")
            .populate("_user")
            .exec();
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
        const updatedReview = await Review.findByIdAndUpdate(
            query,
            updateDocument
        )
            .populate("_service")
            .populate("_user");

        pubsub.publish("UPDATED_REVIEW", {
            updatedReview: updatedReview,
        });

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
        const review = await Review.findOne(query)
            .populate("_service")
            .populate("_user")
            .exec();
        const removedReview = await Review.deleteOne(query);
        pubsub.publish("REMOVED_REVIEW", {
            deletedReview: review,
        });
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
        reviewUpdated: updateReviewByReviewIdHandler,
        removeReview: removeReviewByReviewIdHandler,
    },
    Subscription: {
        addedReview: {
            subscribe: () => pubsub.asyncIterator(["ADDED_REVIEW"]),
        },
        updatedReview: {
            subscribe: () => pubsub.asyncIterator(["UPDATED_REVIEW"]),
        },
        deletedReview: {
            subscribe: () => pubsub.asyncIterator(["REMOVED_REVIEW"]),
        },
    },
};
