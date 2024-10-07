require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./utils/db');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const {initProducer}=require('./events/emitter')
const {initConsumer,initConsumer2}=require('./events/listener')

const app=express();
const server=new ApolloServer({
    typeDefs,
    resolvers
});


server.start().then(async () => {
    await connectDB();
    await initProducer();
    await initConsumer();
    await initConsumer2();

    server.applyMiddleware({ app });

    app.listen(4001, () =>
        console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
    );
}).catch(error => {
    console.error("Error starting Apollo Server:", error);
});