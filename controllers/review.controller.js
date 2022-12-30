const Review = require("../models/review.model");
const { GraphQLError } = require("graphql");

// create new review
const createNewReviewController = async (parent, args) => {
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
const getAllReviewController = async (parent, args) => {
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

// get review by reviewId
const getReviewByReviewIdController = async (parent, args) => {
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
const updateReviewByReviewIdController = async (parent, args) => {
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
const removeReviewByReviewIdController = async (parent, args) => {
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
    createNewReviewController,
    getAllReviewController,
    getReviewByReviewIdController,
    updateReviewByReviewIdController,
    removeReviewByReviewIdController,
};
