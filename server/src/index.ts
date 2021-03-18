import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server";
//
import { mongoDB_PW } from "./mdbconfig";
import Post from "./models/post.model";

const typeDefs = gql`
  type Query {
    allPosts: [Post]
  }

  type Post {
    id: ID
    username: String
    text: String
    date: String
  }
`;

const resolvers = {
  Query: {
    allPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

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
