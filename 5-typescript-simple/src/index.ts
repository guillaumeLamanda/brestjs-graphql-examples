import { ApolloServer, IResolvers } from "apollo-server";
import typeDefs from "./schema.graphql";
import { User, Beer } from "./generated/graphql";

type StoredUser = Omit<User, "beers"> & { beers: number[] };
const users: StoredUser[] = [{ id: 1, name: "John Doe", beers: [1] }];

const beers: Beer[] = [{ id: 1, name: "Brooklin IPA" }];

let nextId = 2;

const context = {};

const resolvers: IResolvers = {
  User: {
    beers: (user, _, __, info) => {
      console.log(user, _, __, info);
      return user.beers.map((beerId: number) =>
        beers.find(({ id }) => id === beerId)
      );
    }
  },
  Query: {
    user: (_, { id }) => users.find(u => u.id === id) || null,
    users: () => users
  },
  Mutation: {
    addUser: (_, { name }) => {
      const l = users.push({
        id: nextId++,
        name,
        beers: []
      });
      return users[l - 1] || null;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen(5000).then(({ url }) => {
  console.log(`server listening on ${url}`);
});
