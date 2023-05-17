import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateColorInput {
  @Field(() => String, { description: 'name for color' })
  name: string;
}
