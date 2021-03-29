import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    login(
      loginInput: { username: $username, email: $email, password: $password }
    ) {
      id
      token
      username
      email
      date
    }
  }
`;
