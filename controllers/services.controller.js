const Service = require("../models/service.model");
// get all services
const getAllServiceController = async (parent, args) => {
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
                .toArray();
        } else {
            services = await Service.find(query).sort(sort).toArray();
        }
        return services;
    } catch (error) {
        throw new GraphQLError("Something Went Wrong", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 501 },
            },
        });
    }
};

// // get service by serviceId
// app.get("/services/:serviceId", async (req, res) => {
//     try {
//         const query = {
//             _id: ObjectId(req.params.serviceId),
//         };
//         const service = await serviceCollection.findOne(query);
//         res.status(200).json(service);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // create new service
// app.post("/services", async (req, res) => {
//     try {
//         const serviceObject = {
//             ...req.body,
//             createdAt: Date.now(),
//         };

//         const newService = await serviceCollection.insertOne(serviceObject);
//         res.status(201).json(newService);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

module.exports = {
    getAllServiceController,
};
