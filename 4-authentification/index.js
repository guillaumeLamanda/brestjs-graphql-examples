const { ApolloServer, gql } = require("apollo-server");
const { BeersAPI, beerTypeDefs, beerResolvers } = require("./beers");
const { userTypeDefs, userResolvers } = require("./users");
const jwt = require("jsonwebtoken");

const typeDefs = gql`
  type Query
  type Mutation
`;

const getUser = req => {
  try {
    const [, token] = req.headers["authorization"].split(" ");
    const user = jwt.verify(token, "anAwesomeSecret");
    return user;
  } catch (error) {
    return null;
  }
};

const context = ({ req }) => ({
  user: getUser(req)
});

const server = new ApolloServer({
  typeDefs: [typeDefs, beerTypeDefs, userTypeDefs],
  resolvers: [beerResolvers, userResolvers],
  dataSources: () => ({
    BeersAPI: new BeersAPI()
  }),
  context
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
