import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
