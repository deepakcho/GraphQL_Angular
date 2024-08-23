import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map, throwError } from 'rxjs';
import { GET_USERS_REPOSITORIES, SEARCH_USER_BY_TERM } from './qraphql.query';

@Injectable()
export class GraphQLService {
  private apollo = inject(Apollo);

  public searchUser(searchTerm: string) {
    return this.apollo
      .watchQuery({
        query: SEARCH_USER_BY_TERM(),
        variables: { searchTerm },
      })
      .valueChanges.pipe(
        map((result: any) => result.data.search.nodes),
        catchError((error) => {
          console.error('GraphQL error:', error);
          return throwError(() => new Error('Failed to fetch users'));
        })
      );
  }

  public getRepositories(username: string) {
    return this.apollo
      .watchQuery({
        query: GET_USERS_REPOSITORIES(),
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
