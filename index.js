const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const {readFileSync} = require('fs');
const expressPlayground = require('graphql-playground-middleware-express').default;
const {GraphQLScalarType} = require('graphql');
const config = require('config');

const app = express();
const PORT = config.get("port") || 4000;

const typeDefs = readFileSync('schema/typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.get('/', (req, res) => res.end('Welcome to the PhotoShare API'));
app.get('/playground', expressPlayground({endpoint: '/typeDefs.graphql'}));

async function startServer() {
    await server.start();
    server.applyMiddleware({app});
    // server
    //     .listen()
    //     .then(({url}) => console.log(`GraphQL Service running on ${url}`))
    app.listen(PORT, () => console.log(`GraphQL server running http://localhost:${PORT}${server.graphqlPath}`));
}

startServer();