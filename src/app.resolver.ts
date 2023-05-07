import { Query, Resolver } from '@nestjs/graphql';
import { App } from './app.model';

@Resolver((of) => App)
export class AppResolver {
  @Query((returns) => [App])
  getAllApps() {
    return [
      {
        id: 1,
        title: 'this is an nest application',
        description: ' this is a description',
      },
    ];
  }
}
