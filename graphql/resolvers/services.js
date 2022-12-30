const {
    getAllServiceController,
    getServiceByServiceIdController,
    createNewServiceController,
} = require("../../controllers/services.controller");

module.exports = {
    Query: {
        getAllServices: getAllServiceController,
        getService: getServiceByServiceIdController,
    },
    Mutation: {
        createNewService: createNewServiceController,
    },
};
