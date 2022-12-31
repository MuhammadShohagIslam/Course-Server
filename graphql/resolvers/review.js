const {
    getAllReviewController,
    getReviewByReviewIdController,
    createNewReviewController,
    updateReviewByReviewIdController,
    removeReviewByReviewIdController,
    getReviewBySpecificUserController
} = require("../../controllers/review.controller");
const dateScalar  = require("../custom-scaler/date.scaler");

module.exports = {
    Date: dateScalar,
    Query: {
        getAllReview: getAllReviewController,
        getReview: getReviewByReviewIdController,
        getReviewBySpecificUser: getReviewBySpecificUserController,
    },
    Mutation: {
        createNewReview: createNewReviewController,
        updateReview: updateReviewByReviewIdController,
        removeReview: removeReviewByReviewIdController,
    },
};
