import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true, description: 'name for user' })
  name: string;

  @Field(() => String, { nullable: true, description: 'email for user' })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'phone for user (optional)',
  })
  phone: string;

  @Field(() => Int, {
    nullable: true,
    description: 'user roleId (optional)',
  })
  roleId: number;
}
