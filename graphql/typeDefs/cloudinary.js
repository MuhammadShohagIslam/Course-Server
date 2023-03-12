module.exports = `
    type UploadResult{
        public_id: String!,
        url: String!
    }
    type DeleteImage{
        success: Boolean,
        message: String!
    }

    type Mutation{
        uploadImage(uploadImageFile:String!): UploadResult! 
        removeImage(publicId: String!): DeleteImage 
    }
`;
