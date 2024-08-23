import { inject } from '@angular/core';
import { GraphQLService } from '../graphql.service';
import { Repo } from '../model/repo.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../model/user.model';

type AppState = {
  searchedUsers: User[];
  repositories: Repo[];
  loading: boolean;
};

const initialState: AppState = {
  searchedUsers: [],
  repositories: [],
  loading: false,
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, graphQLService = inject(GraphQLService)) => ({
    loadRepo(username: string) {
      patchState(store, { loading: true });
      // get the Repositories by login name
      graphQLService.getRepositories(username).subscribe((result: Repo[]) => {
        patchState(store, {
          repositories: result,
          loading: false,
        });
      });
    },
    searchUser(queryStr: string) {
      patchState(store, { loading: true });
      // search the users by query string
      graphQLService.searchUser(queryStr).subscribe((result: User[]) => {
        patchState(store, {
          searchedUsers: result,
          loading: false,
        });
      });
    },
  }))
);
