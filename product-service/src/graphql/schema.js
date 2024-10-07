const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        inventory: Int!
    }

    type Query {
        getProduct(id: ID!): Product
        listProducts: [Product!]!
    }

    type Mutation {
        createProduct(name: String!, description: String, price: Float!, inventory: Int!): Product!
        updateProduct(id: ID!, name: String, description: String, price: Float, inventory: Int): Product!
        deleteProduct(id: ID!): Boolean
        updateInventory(id: ID!, quantity: Int!): Product!
    }
`;

module.exports = typeDefs;
