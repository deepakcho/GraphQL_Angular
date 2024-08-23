import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpHeaders,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache';
import { GraphQLService } from './graphql.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://api.github.com/graphql',
            headers: new HttpHeaders({
              Authorization: `Bearer `,
            }),
          }),
        };
      },
      deps: [HttpLink],
    },
    importProvidersFrom(
      ApolloModule
      // StoreModule.forRoot(appReducers),
      // EffectsModule.forRoot([])
    ),

    GraphQLService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
