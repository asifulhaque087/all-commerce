import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCombinationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
