const {
    getAllServiceByPageController,
    getServiceByServiceIdController,
    createNewServiceController,
    getAllServicesUnderLimitController,
} = require("../../controllers/services.controller");

module.exports = {
    Query: {
        getAllServiceByPage: getAllServiceByPageController,
        getAllServicesUnderLimit: getAllServicesUnderLimitController,
        getService: getServiceByServiceIdController,
    },
    Mutation: {
        createNewService: createNewServiceController,
    },
};
