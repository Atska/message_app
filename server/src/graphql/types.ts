import { gql } from "apollo-server";

export default gql`
  type Mutation {
    signup(signupInput: signup!): User!
    login(loginInput: login!): User!
    createPost(text: String!): Post!
    updatePost(post_id: ID!, text: String!): String!
    deletePost(post_id: ID!): String!
  }

  type Query {
    allPosts: [Post]
    findPost(post_id: ID!): Post
    findUser(username: String!): User!
  }

  type Post {
    id: ID
    username: String
    text: String
    date: String
  }

  input signup {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input login {
    username: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    date: String!
  }
`;
