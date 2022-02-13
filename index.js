const {ApolloServer} = require('apollo-server');

const typeDefs = `
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }
    
    input PostPhotoInput {
        name: String!
        description: String
        category: PhotoCategory = PORTRAIT
    }
    type User {
        githubLogin: ID!,
        name: String
        avatar: String
        postedPhotos: [Photo!]!
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }
    
    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }
    
    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`;
let _id = 0;

var users = [
    { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
    { "githubLogin": "gPlake", "name": "Glen Plake" },
    { "githubLogin": "sSchmidt", "name": "Scot Schmidt" }
]
var photos = [
    {
        "id": "1",
        "name": "Dropping the Heart Chute",
        "description": "The heart chute is one of my favorite chutes",
        "category": "ACTION",
        "githubUser": "gPlake"
    },
    {
        "id": "2",
        "name": "Enjoying the sunshine",
        "category": "SELFIE",
        "githubUser": "sSchmidt"
    },
    {
        id: "3",
        "name": "Gunbarrel 25",
        "description": "25 laps on gunbarrel today",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt"
    }
]

const resolvers = {
    Query: {
        //Распознователь. Возвращает данные в типе и форме, заданных схемой
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },
    Mutation: {
        postPhoto(parent, args) {
            let newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto);
            return newPhoto;
        }
    },
    Photo: {
        url:  parent => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser);
        }
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin);
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