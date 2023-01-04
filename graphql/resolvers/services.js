const {
    getAllServiceByPageController,
    getServiceByServiceIdController,
    createNewServiceController,
    getAllServicesUnderLimitController,
    getSearchResultController
} = require("../../controllers/services.controller");

module.exports = {
    Query: {
        getAllServiceByPage: getAllServiceByPageController,
        getAllServicesUnderLimit: getAllServicesUnderLimitController,
        getService: getServiceByServiceIdController,
        getSearchResult: getSearchResultController
    },
    Mutation: {
        createNewService: createNewServiceController,
    },
};
