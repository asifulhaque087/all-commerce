import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeInput {
  @Field(() => String, { description: 'name for attribute' })
  name: string;
}
