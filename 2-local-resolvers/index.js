const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Beer {
    id: Int!
    name: String!
  }
  type User {
    id: Int!
    name: String!
    beers: [Beer!]!
  }
  type Query {
    beers: [Beer!]!
    beer: Beer
    users: [User!]!
    user(id: Int!): User
  }
  type Mutation {
    addUser(name: String!): User!
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

const users = [
  {
    id: 1,
    name: "John Doe",
    beers: [2]
  }
];

let nextId = 2;

const resolvers = {
  User: {
    beers: ({ beers: userBeersIds }) =>
      userBeersIds.map(id => beers.find(({ id: beerId }) => beerId === id))
  },
  Query: {
    beers: () => beers,
    beer: (_, { id }) => beers.find(beer => beer.id === id),
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
  },
  Mutation: {
    addUser: (_, { name }) => {
      const index = users.push({
        id: nextId++,
        name
      });
      return users[index - 1];
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
