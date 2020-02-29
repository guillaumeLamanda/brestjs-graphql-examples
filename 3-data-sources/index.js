const { ApolloServer, gql } = require("apollo-server");
const { BeersAPI, beerTypeDefs, beerResolvers } = require("./beers");
const { userTypeDefs, userResolvers } = require("./users");

const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDefs, beerTypeDefs, userTypeDefs],
  resolvers: [beerResolvers, userResolvers],
  dataSources: () => ({
    BeersAPI: new BeersAPI()
  })
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
