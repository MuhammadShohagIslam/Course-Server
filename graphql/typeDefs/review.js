 module.exports = `
    scalar Date
    
    type Review{
        _id: ID!,
        _service: ID!,
        serviceName: String!,
        name: String,
        img: String!,
        email: String,
        comment: String,
        star: Int!,
        createdAt: Date!
    }
    type DeleteReview{
        acknowledged: Boolean,
        deletedCount: Int
    }
    type UpdatedReview{
        acknowledged: Boolean,
        modifiedCount: Int,
        upsertedId: String,
        upsertedCount: Int,
        matchedCount: Int
    }

    # input type
    input CreateNewReviewInput{
        _service: ID!,
        serviceName: String!,
        name: String,
        email: String,
        img: String!,
        comment: String,
        star: Int! 
    }
    input UpdateReviewInput{
        comment: String,
        star: Int!,
    }

    type Query{
        getAllReview(query:ID): [Review!]!,
        getReview(reviewId: ID!): Review!,
        getReviewBySpecificUser(name: String, email:String!): [Review!]!
    }

    type Mutation{
        createNewReview(input: CreateNewReviewInput!): Review!,
        updateReview(reviewId: ID!, input: UpdateReviewInput!): UpdatedReview!,
        removeReview(reviewId: ID!): DeleteReview
    }
    type Subscription{
        reviewAdded: Review
    }
`;
