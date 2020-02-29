const { gql } = require("apollo-server");

const beerTypeDefs = gql`
  type Beer {
    id: Int!
    name: String!
  }

  extend type Query {
    beers(page: Int, pageSize: Int): [Beer!]!
    beer(id: Int!): Beer
  }
`;

module.exports = beerTypeDefs;
