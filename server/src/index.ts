import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
//
import { mongoDB_PW } from "./mdbconfig";
import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";

// typeDefs -> types of the resolvers || resolvers -> database queries
const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
  }),
});

//mongodb
mongoose
  .connect(mongoDB_PW, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connected!");
    return server.listen({ port: 5000 });
  })
  .then((res: any) => {
    console.log(`🚀  Server ready at ${res.url}`);
  });
