const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
    ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");
const { typeDefs, resolvers } = require("./graphql/schema");
const { mongo_db_run } = require("./configs/mongodb");
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT;

// Rest API endpoint
app.get("/rest", (req, res) => {
    res.send("GraphQL Server is RestAPI");
});

// graphql server
async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        "/graphql",
        cors(),
        json(),
        expressMiddleware(server, {
            context: ({ req, res }) => ({ req, res }),
        })
    );

    const serverListen = new Promise((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );
    serverListen.then(() => {
        mongo_db_run();
        console.log(
            `🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`
        );
        console.log(`🚀 RestAPI Server ready at http://localhost:${PORT}`);
    });
}

startApolloServer(typeDefs, resolvers);
