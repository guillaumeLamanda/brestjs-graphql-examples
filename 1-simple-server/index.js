const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Beer {
    id: Int!
    name: String!
  }
  type Query {
    beers: [Beer!]!
    beer: Beer
  }
`;

const beers = [
  {
    id: 1,
    name: "Baril white"
  },
  {
    id: 2,
    name: "Pelforte"
  }
];

const resolvers = {
  Query: {
    beers: () => beers,
    beer: (_, { id }) => beers.find(beer => beer.id === id)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
