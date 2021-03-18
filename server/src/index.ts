import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server";
import { mongoPW } from "./mdbconfig";

const typeDefs = gql`
  type Query {
    helloWorld: String!
  }
`;

const resolvers = {
  Query: {
    helloWorld: (): string => `${mongoPW}`,
  },
};

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

//mongodb
mongoose
  .connect(mongoPW, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connected!");
    return server.listen({ port: 5000 });
  })
  .then((res: any) => {
    console.log(`🚀  Server ready at ${res.url}`);
  });
