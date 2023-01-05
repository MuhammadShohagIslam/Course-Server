const mongoose = require("mongoose");

const mongo_db_run = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL must be defined");
    }
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName:"courseService",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Database is connected!");
    } catch (error) {
        console.log(`MongoDB connection is failed!. ${error.message}`);
    }
};

module.exports = {
    mongo_db_run,
};
