 module.exports = `
    scalar Date
    type Review{
        _id: ID!,
        _service: Service!,
        _user: User!
        comment: String,
        star: Int!,
        createdAt: Date!
    }

    # input type
    input CreateNewReviewInput{
        serviceId: ID!,
        email: String,
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
        updateReview(reviewId: ID!, input: UpdateReviewInput!): UpdatedService,
        removeReview(reviewId: ID!): DeleteService
    }
`;
