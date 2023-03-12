const express = require("express");
const cloudinary = require("cloudinary").v2;
const http = require("http");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const bodyParser = require("body-parser");
const { mongo_db_run } = require("./configs/mongodb");
// graphql
const { ApolloServer } = require("@apollo/server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { PubSub } = require("graphql-subscriptions");
const { typeDefs, resolvers } = require("./graphql/schema");
// // importing middleware
// const { authCheckMiddleware } = require("./helper/checkAuth.helper");
// // importing controller
// const { upload, remove } = require("./controllers/cloudinary");
require("dotenv").config();
require("events").EventEmitter.prototype._maxListeners = Infinity;

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use([cors()]);

// graphql server
async function startApolloServer(typeDefs, resolvers) {
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const pubSub = new PubSub();
    // websocket server
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });

    const serverCleanup = useServer(
        {
            schema,
        },
        wsServer
    );

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    app.use(
        "/graphql",
        cors({ origin: true, credentials: true }),
        json({ limit: "500mb" }),
        urlencoded({ extended: true, parameterLimit: 100000, limit: "500mb" }),
        expressMiddleware(server, {
            context: ({ req }) => ({ req, pubSub }),
        })
    );

    // Rest API endpoint
    app.get("/rest", (req, res) => {
        res.send("GraphQL Server is RestAPI");
    });

    // // upload and remove images
    // app.post("/upload-images", authCheckMiddleware, upload);
    // app.post("/remove-images", authCheckMiddleware, remove);

    const serverListen = new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );

    // cloudinary configaration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    serverListen.then(() => {
        mongo_db_run();
        console.log(
            `🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`
        );
        console.log(
            `🚀 Subscriptions is ready at ws://localhost:${PORT}/graphql`
        );
        console.log(`🚀 RestAPI Server ready at http://localhost:${PORT}`);
    });
}

startApolloServer(typeDefs, resolvers);
