const {ApolloServer} = require('apollo-server');

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
`
const resolvers = {
    Query: {
        //Распознователь. Возвращает данные в типе и форме, заданных схемой
        totalPhotos: () => 42
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});
function startServer() {
    server
        .listen()
        .then(({url}) => console.log(`GraphQL Service running on ${url}`))
}

startServer();