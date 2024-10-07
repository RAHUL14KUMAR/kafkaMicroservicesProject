const {gql}=require("apollo-server");

const typedef=gql`
    type User{
        id:ID!
        username:String!
        email:String!
        password:String!
    }
    
    type AuthPayload{
        token:String!
        user:User!
    }

    type Query{
        user(id:ID!):User!
    }

    type Mutation{
        register(username:String!,email:String!,password:String!):AuthPayload!
        login(email:String!,password:String!):AuthPayload!
        updateProfile(username: String, email: String): User!
    }
`
module.exports = typedef;