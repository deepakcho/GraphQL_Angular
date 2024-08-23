import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, of, throwError } from 'rxjs';
import { RepoStore } from './store/repo.store';

@Injectable()
export class GraphQLService {
  constructor() {}
  apollo = inject(Apollo);

  searchUser(searchTerm: string) {
    const SEARCH_TERM = gql`
      query SearchUsersByLogin($searchTerm: String!) {
        search(query: $searchTerm, type: USER, first: 10) {
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
    // return of([]);
    return this.apollo
      .watchQuery({
        query: SEARCH_TERM,
        variables: { searchTerm },
      })
      .valueChanges.pipe(
        map((result: any) => result.data.search.nodes),
        catchError((error) => {
          console.error('GraphQL error:', error);
          return throwError(() => new Error('Failed to fetch repositories'));
        })
      );
  }

  getRepositories(username: string) {
    const GET_REPOSITORIES = gql`
      query ($username: String!) {
        user(login: $username) {
          repositories(first: 50) {
            nodes {
              name
              url
              stargazerCount
            }
          }
        }
      }
    `;
    // return of([]);
    return this.apollo
      .watchQuery({
        query: GET_REPOSITORIES,
        variables: { username },
      })
      .valueChanges.pipe(
        map((result: any) => result.data.user.repositories.nodes),
        catchError((error) => {
          console.error('GraphQL error:', error);
          return throwError(() => new Error('Failed to fetch repositories'));
        })
      );
  }
}
