import { gql } from 'apollo-angular';

export const GET_USERS_REPOSITORIES = (limit = 50) => gql`
  query ($username: String!) {
    user(login: $username) {
      repositories(first: ${limit}) {
        nodes {
          name
          url
          stargazerCount
        }
      }
    }
  }
`;

export const SEARCH_USER_BY_TERM = (limit = 10) => gql`
  query SearchUsersByLogin($searchTerm: String!) {
    search(query: $searchTerm, type: USER, first: ${limit}) {
      nodes {
        ... on User {
          login
          name
          url
        }
      }
    }
  }
`;
