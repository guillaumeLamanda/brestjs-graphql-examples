const { ApolloServer, gql, ApolloError } = require("apollo-server");
const status = require("http-status");

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
    beer(id: String!): Beer
    users: [User!]!
    user(id: Int!): User
  }
  type Mutation {
    addUser(name: String!): User!
    likeBeer(userId: Int!, beerId: Int!): User!
    unlikeBeer(userId: Int!, beerId: Int!): User!
  }
`;

const beers = [
  {
    id: 1,
    name: "Baril white",
  },
  {
    id: 2,
    name: "Pelforte",
  },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    beers: [2],
  },
];

let nextId = 2;

const resolvers = {
  User: {
    beers: ({ beers: userBeersIds }) =>
      userBeersIds.map((id) => beers.find(({ id: beerId }) => beerId === id)),
  },
  Query: {
    beers: () => beers,
    beer: (_, { id }) => beers.find((beer) => beer.id === id),
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
  },
  Mutation: {
    addUser: (_, { name }) => {
      const index = users.push({
        id: nextId++,
        name,
        beers: [],
      });
      return users[index - 1];
    },
    likeBeer: (_, { userId, beerId }) => {
      const user = users.find(({ id }) => id === userId);
      if (!user) throw new ApolloError("User not found", status.NOT_FOUND);
      if (user.beers.some((id) => id === beerId))
        throw new ApolloError(
          "Beer already liked",
          status.UNPROCESSABLE_ENTITY
        );
      if (!beers.some(({ id }) => id === beerId))
        throw new ApolloError(
          "This beer does not exist",
          status.UNPROCESSABLE_ENTITY
        );
      user.beers.push(beerId);
      return user;
    },
    unlikeBeer: (_, { userId, beerId }) => {
      const user = users.find(({ id }) => id === userId);
      if (!user) throw new ApolloError("User not found", status.NOT_FOUND);
      if (!user.beers.some((id) => id === beerId))
        throw new ApolloError(
          "Beer already liked",
          status.UNPROCESSABLE_ENTITY
        );
      user.beers = user.beers.filter((id) => id === beerId);
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
