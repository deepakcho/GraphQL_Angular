import { inject } from '@angular/core';
import { GraphQLService } from '../graphql.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../model/user.model';

type UserState = {
  users: User[];
  loading: boolean;
};

const initialState: UserState = {
  users: [],
  loading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, graphQLService = inject(GraphQLService)) => ({
    searchUser(queryStr: string) {
      patchState(store, { loading: true });
      // search the users by query string
      graphQLService.searchUser(queryStr).subscribe((result: User[]) => {
        patchState(store, {
          users: result,
          loading: false,
        });
      });
    },
  }))
);
