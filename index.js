const {ApolloServer} = require('apollo-server');

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }
    
    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`;

let photos = [];
const resolvers = {
    Query: {
        //Распознователь. Возвращает данные в типе и форме, заданных схемой
        totalPhotos: () => 42
    },
    Mutation: {
        postPhoto(parent, args) {
            photos.push(args);
            return true;
        }
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