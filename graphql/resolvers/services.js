const {
    getAllServiceController,
} = require("../../controllers/services.controller");

module.exports = {
    Query: {
        getAllServices: getAllServiceController,
    },
};
