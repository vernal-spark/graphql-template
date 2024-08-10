import { User } from "./user";
import { ApolloServer } from "@apollo/server";

async function createGqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
    ${User.queries}
    }
    type Mutation{
    ${User.mutations}
    }`,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
}

export default createGqlServer;
