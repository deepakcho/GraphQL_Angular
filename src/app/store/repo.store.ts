import { inject } from '@angular/core';
import { GraphQLService } from '../graphql.service';
import { Repo } from '../model/repo.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type RepoState = {
  repositories: Repo[];
  loading: boolean;
};

const initialState: RepoState = {
  repositories: [],
  loading: false,
};

export const RepoStore = signalStore(
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
  }))
);
