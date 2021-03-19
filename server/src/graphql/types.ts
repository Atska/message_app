import { gql } from "apollo-server";

export default gql`
  type Query {
    allPosts: [Post]
  }

  type Post {
    id: ID
    username: String
    text: String
    date: String
  }

  type Mutation {
    signup(signupInput: signup): User
  }

  input signup {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type User {
    id: ID
    username: String!
    email: String!
  }
`;
