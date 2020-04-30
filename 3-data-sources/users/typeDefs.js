const { gql } = require("apollo-server");

const beerTypeDefs = gql`
  type User {
    id: Int!
    name: String!
    beers: [Beer!]!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(name: String!): User!
  }
`;

module.exports = beerTypeDefs;
