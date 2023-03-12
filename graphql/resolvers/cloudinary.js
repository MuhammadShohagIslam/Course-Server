const cloudinary = require("cloudinary").v2;
const { GraphQLError } = require("graphql");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// upload image
const uploadImageHandler = async (parent, args) => {
    try {
        let result = await cloudinary.uploader.upload(args.uploadImageFile, {
            public_id: `${Date.now()}`,
            resource_type: "auto",
            crop: "limit",
        });
        return {
            public_id: result.public_id,
            url: result.secure_url,
        };
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            },
        });
    }
};

// delete image
const deletedImageHandler = async (parent, args) => {
    try {
        try {
            let image_id = args.publicId;
            let result;
            cloudinary.uploader.destroy(image_id, (err, result) => {
                if (err)
                    return (result = { success: false, message: err.message });
                result = { success: true, message: "image is removed" };
            });
            return result;
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: 500,
                    http: { status: 500 },
                },
            });
        }
    } catch (error) {
        throw new GraphQLError(error.message || "Server Error", {
            extensions: {
                code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
            },
        });
    }
};

module.exports = {
    Mutation: {
        uploadImage: uploadImageHandler,
        removeImage: deletedImageHandler,
    },
};
