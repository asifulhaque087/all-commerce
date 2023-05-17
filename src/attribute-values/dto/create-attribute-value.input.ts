import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeValueInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
