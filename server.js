const express = require("express");
const http = require("http");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
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
// importing middleware
const { authCheckMiddleware } = require("./helper/checkAuth.helper");
// importing controller
const { upload, remove } = require("./controllers/cloudinary");
require("dotenv").config();
require('events').EventEmitter.prototype._maxListeners = Infinity

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT;

app.use([
    cors(),
    json({ limit: "50mb" }),
    urlencoded({ limit: "50mb", extended: true }),
]);

// Rest API endpoint
app.get("/rest", (req, res) => {
    res.send("GraphQL Server is RestAPI");
});

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
        cors(),
        json(),
        expressMiddleware(server, {
            context: ({ req }) => ({ req, pubSub }),
        })
    );

    // upload and remove images
    app.post("/upload-images", authCheckMiddleware, upload);
    app.post("/remove-images", authCheckMiddleware, remove);

    const serverListen = new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );
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
