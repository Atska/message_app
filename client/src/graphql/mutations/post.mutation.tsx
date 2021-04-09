import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation($text: String!) {
    createPost(text: $text) {
      id
      username
      text
      date
    }
  }
`;
