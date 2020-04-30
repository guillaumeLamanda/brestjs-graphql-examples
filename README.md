# GraphQL examples for BrestJS Conference

This repository is a set of examples of GraphQL Implementation.

1. Simple server, no relation.
   Introduction to resolvers. Everything is in `index.js` file.
2. Add new relation between users and beers. This lead us to add a custom resolver for the user property `beers`.
3. Unmocking Beers Data, using a RESTDatasource. See [beer datasource](./3-data-sources/beers/datasource.js). Project Architecture refactored by Domain.
4. Use context to share objects between resolvers. This example implements authentification. See [context defined](4-authentification/index.js) and [users resolvers](4-authentification/users/resolvers.js)
