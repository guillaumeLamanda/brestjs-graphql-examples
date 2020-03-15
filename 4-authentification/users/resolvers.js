const { ApolloError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const users = [
  {
    id: 1,
    name: "John Doe",
    password: "awesomePassword",
    beers: [2]
  }
];

let nextId = 2;

const beerResolvers = {
  User: {
    beers: ({ beers: userBeersIds }, __, { dataSources: { BeersAPI } }) =>
      userBeersIds.map(id => BeersAPI.getBeer(id))
  },
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    me: (_, __, { user: { id } }) => users.find(user => user.id === id)
  },
  Mutation: {
    addUser: (_, { name }) => {
      const index = users.push({
        id: nextId++,
        name
      });
      return users[index - 1];
    },
    login: (_, { name, password }) => {
      const user = users.find(
        user => user.name === name && user.password === password
      );
      if (!user) {
        throw new ApolloError("invalid credentials", 504);
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name
        },
        "anAwesomeSecret"
      );
      return {
        token,
        user
      };
    }
  }
};

module.exports = beerResolvers;
