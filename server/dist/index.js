const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
//
const { mongoPW } = require("./mdbconfig");
const typeDefs = gql `
  type Query {
    helloWorld: String!
  }
`;
const resolvers = {
    Query: {
        helloWorld: () => `${mongoPW}`,
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
//mongodb
mongoose
    .connect(mongoPW, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log("Mongo connected!");
    return server.listen({ port: 5000 });
})
    .then((res) => {
    console.log(`🚀  Server ready at ${res.url}`);
});
//# sourceMappingURL=index.js.map