import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      signupInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      token
      username
      email
      date
    }
  }
`;
