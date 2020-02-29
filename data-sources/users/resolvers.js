const users = [
  {
    id: 1,
    name: "John Doe",
    beers: [2]
  }
];

const beerResolvers = {
  User: {
    beers: ({ beers: userBeersIds }, __, { dataSources: { BeersAPI } }) =>
      userBeersIds.map(id => BeersAPI.getBeer(id))
  },
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
  }
};

module.exports = beerResolvers;
