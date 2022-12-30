module.exports = `
    type Review{
        _id: ID!,
        _service: ID!,
        serviceName: String!,
        name: String!,
        img: String!,
        comment: String,
        star: Int!
    }
    type DeleteReview{
        acknowledged: Boolean,
        deletedCount: Int
    }
    type UpdatedReview{
        acknowledged: Boolean,
        modifiedCount: Int,
        upsertedId: null | String,
        upsertedCount: Int,
        matchedCount: Int
    }

    # input type
    input CreateNewReviewInput{
        _service: ID!,
        serviceName: String!,
        name: String!,
        img: String!,
        comment: String,
        star: Int! 
    }
    input UpdateReviewInput{
        comment: String,
        star: Int! 
    }

    type Query{
        getAllReview: [Review!]!,
        getReview(reviewId: ID!): Review!
    }
    
    type Mutation{
        createNewReview(input: CreateNewReviewInput!): Review!,
        removeReview(reviewId: ID!): DeleteReview! ,
        updateReview(reviewId: ID!, input: UpdateReviewInput!): UpdatedReview!
    }

`;
