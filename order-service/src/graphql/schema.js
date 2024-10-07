const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Order {
        id: ID!
        userId: String!
        productId: String!
        quantity: Int!
        status: String!
        createdAt: String!
    }

    type Query {
        getOrder(id: ID!): Order
        listOrders: [Order!]!
    }

    type Mutation {
        createOrder(userId: String!, productId: String!, quantity: Int!): Order!
        shipOrder(id: ID!): Order!
    }
`;

module.exports = typeDefs;
