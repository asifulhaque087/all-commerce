import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Combination {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
