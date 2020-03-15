const { RESTDataSource } = require("apollo-datasource-rest");

/**
 * @see https://punkapi.com/documentation/v2
 */

class BeersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.punkapi.com/v2/";
  }

  async getBeer(id) {
    /**
     * For single beer, punkapi still return an array 😡
     */
    const beer = (await this.get(`beers/${id}`))[0];
    return beer;
  }

  async getBeers(page = 1, pageSize = 25) {
    return this.get(`beers?per_page=${pageSize}&page=${page}`);
  }
}

module.exports = BeersAPI;
