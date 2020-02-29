const beerResolvers = {
  Query: {
    beers: (_, { page, pageSize }, { dataSources: { BeersAPI } }) =>
      BeersAPI.getBeers(page, pageSize),
    beer: (_, { id }, { dataSources: { BeersAPI } }) => BeersAPI.getBeer(id)
  }
};

module.exports = beerResolvers;
