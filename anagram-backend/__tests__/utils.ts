import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "../src/typedefs";
import { resolvers } from "../src/resolvers";
import { createTestClient } from "apollo-server-integration-testing";

export const apolloServer = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
  }),
  // Enable graphql gui
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    return { headers: req.headers };
  },
});

describe("Test Server Creation", () => {
  it("initializes server", async () => {
    const { query, mutate } = createTestClient({
      apolloServer,
    });
    //Verify query and mutation are instantiated
    expect(query).toBeDefined();
    expect(mutate).toBeDefined();
  });
});
