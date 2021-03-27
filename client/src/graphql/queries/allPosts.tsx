import { gql } from "@apollo/client";

export const allPosts = gql`
  query {
    allPosts {
      id
      username
      text
      date
      comments {
        id
        text
        username
        date
      }
      likes {
        id
        username
        date
      }
    }
  }
`;
