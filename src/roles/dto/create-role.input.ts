import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'name for role' })
  name: string;
}
