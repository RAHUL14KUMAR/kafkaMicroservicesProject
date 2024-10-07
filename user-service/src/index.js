require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./utils/db');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const {initProducer}=require('./events/emitter');
const {initConsumer}=require('./events/listener')

const app=express();
const server=new ApolloServer({
    typeDefs,
    resolvers
});

const eventHandler=async (event)=>{
    console.log("event",event)
    const {type,data}=JSON.parse(event.value.toString());
    switch(type){
        case 'product-created':
            console.log("product-created")
            break;

        case 'user-created':
            console.log("user-created")
            break;

        default:
            console.log(`Unhandled event type: ${type}`);
    }
}

server.start().then(async () => {
    await connectDB();
    await initProducer();
    await initConsumer(eventHandler);

    server.applyMiddleware({ app });

    // Start the server
    app.listen(4000, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}).catch(error => {
    console.error("Error starting Apollo Server:", error);
});