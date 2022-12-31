const {
    getAllReviewController,
    getReviewByReviewIdController,
    createNewReviewController,
    updateReviewByReviewIdController,
    removeReviewByReviewIdController,
} = require("../../controllers/review.controller");
const dateScalar  = require("../custom-scaler/date.scaler");

module.exports = {
    Date: dateScalar,
    Query: {
        getAllReview: getAllReviewController,
        getReview: getReviewByReviewIdController,
    },
    Mutation: {
        createNewReview: createNewReviewController,
        updateReview: updateReviewByReviewIdController,
        removeReview: removeReviewByReviewIdController,
    },
};
