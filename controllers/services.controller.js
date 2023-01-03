const Service = require("../models/service.model");
const { GraphQLError } = require("graphql");

// get all services by page
const getAllServiceByPageController = async (parent, args) => {
    try {
        const query = {};
        const sort = {
            createdAt: -1,
        };
        let services;
        if (args.page) {
            const perPage = 3;
            const page = args.page || 1;
            const servicesByPagination = await Service.find(query)
                .sort(sort)
                .skip(perPage * (page - 1))
                .limit(perPage)
                .exec();
            const totalService = await Service.find(query)
                .estimatedDocumentCount()
                .exec();
            services = {
                servicesByPagination,
                totalService,
            };
        }
        return services;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 501,
                http: { status: 501 },
            },
        });
    }
};
// get all services under the limit
const getAllServicesUnderLimitController = async (parent, args) => {
    try {
        const query = {};
        const sort = {
            createdAt: -1,
        };

        let services;
        if (args.limit) {
            services = await Service.find(query)
                .sort(sort)
                .limit(args.limit)
                .exec();
        } else {
            services = await Service.find(query).sort(sort).exec();
        }
        return services;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 501,
                http: { status: 501 },
            },
        });
    }
};

// get service by serviceId
const getServiceByServiceIdController = async (parent, args) => {
    try {
        const query = {
            _id: args.serviceId,
        };
        const service = await Service.findOne(query);
        return service;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// create new service
const createNewServiceController = async (parent, args) => {
    try {
        const serviceObject = {
            ...args.input,
        };

        const newService = new Service(serviceObject);
        const newServiceSave = await newService.save();
        return newServiceSave;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

module.exports = {
    getAllServiceByPageController,
    getAllServicesUnderLimitController,
    getServiceByServiceIdController,
    createNewServiceController,
};
