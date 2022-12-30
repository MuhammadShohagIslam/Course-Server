const {
    getAllReviewController,
    getReviewByReviewIdController,
    createNewReviewController,
    updateReviewByReviewIdController,
    removeReviewByReviewIdController,
} = require("../../controllers/review.controller");

module.exports = {
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
