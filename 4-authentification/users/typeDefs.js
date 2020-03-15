const { gql } = require("apollo-server");

const beerTypeDefs = gql`
  type Credential {
    token: String!
    user: User!
  }
  type User {
    id: Int!
    name: String!
    beers: [Beer!]!
  }

  extend type Query {
    users: [User!]!
    user(id: Int!): User
    me: User
  }

  extend type Mutation {
    addUser(name: String!): User!
    login(name: String!, password: String!): Credential!
  }
`;

module.exports = beerTypeDefs;
