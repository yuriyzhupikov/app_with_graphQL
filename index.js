const {ApolloServer} = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const express = require('express');
const {MongoClient} = require('mongodb');
const {readFileSync} = require('fs');
const config = require('config');

const typeDefs = readFileSync('schema/typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');

const PORT = config.get("port") || 4000;

async function startServer() {
    const app = express();
    const mongoUrl = config.get('DB_HOST');

    const client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
    const db = client.db();
    const context = {db};

    const server = new ApolloServer({typeDefs, resolvers, context});
    server.applyMiddleware({app});

    app.get('/', (req, res) => res.end('Welcome to the PhotoShare API'));
    app.get('/playground', expressPlayground({endpoint: '/typeDefs.graphql'}));

    //await server.start();

    // server
    //     .listen()
    //     .then(({url}) => console.log(`GraphQL Service running on ${url}`))
    app.listen(PORT, () => console.log(`GraphQL server running http://localhost:${PORT}${server.graphqlPath}`));
}

startServer();