const { GraphQLError } = require("graphql");
const { PubSub } = require('graphql-subscriptions')
const Service = require("../../models/service.model");
const { checkAuth } = require("../../helper/checkAuth.helper");
const pubsub = new PubSub();


// create new service
const createNewServiceHandler = async (parent, args) => {
    try {
        const serviceObject = {
            ...args.input,
        };
        const newService = new Service(serviceObject);
        const newServiceSave = await newService.save();
        pubsub.publish("SERVICE_ADDED", {
            serviceAdded: newServiceSave,
        });
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

// get all services by page
const getAllServiceByPageHandler = async (parent, args) => {
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
const getAllServicesUnderLimitHandler = async (parent, args) => {
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

// get service by search query
const getSearchResultHandler = async (parent, args) => {
    try {
        const services = await Service.find({
            name: { $regex: args.search, $options: "i" },
        }).exec();
        return services;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// get service by serviceId
const getServiceByServiceIdHandler = async (parent, args) => {
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
// update service by serviceId
const updateServiceByServiceIdHandler = async (parent, args) => {
    try {
        const query = {
            _id: args.serviceId,
        };
        const updateDocument = {
            ...args.input,
        };
        const updatedService = await Service.updateOne(query, updateDocument);
        return updatedService;
    } catch (error) {
        throw new GraphQLError(error.message, {
            extensions: {
                code: 500,
                http: { status: 500 },
            },
        });
    }
};

// delete service by serviceId
const deletedServiceByServiceIdHandler = async (parent, args) => {
    try {
        try {
            const query = {
                _id: args.serviceId,
            };
            const removedService = await Service.deleteOne(query);
            return removedService;
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: 500,
                    http: { status: 500 },
                },
            });
        }
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
    Query: {
        getAllServiceByPage: getAllServiceByPageHandler,
        getAllServicesUnderLimit: getAllServicesUnderLimitHandler,
        getService: getServiceByServiceIdHandler,
        getSearchResult: getSearchResultHandler,
    },
    Mutation: {
        createNewService: createNewServiceHandler,
        updateService: updateServiceByServiceIdHandler,
        removeService: deletedServiceByServiceIdHandler,
    },
    Subscription: {
        serviceAdded: {
            subscribe: () => pubsub.asyncIterator(["SERVICE_ADDED"]),
        },
    },
};
