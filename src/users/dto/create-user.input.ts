import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name for user' })
  name: string;

  @Field(() => String, { description: 'email for user' })
  email: string;

  @Field(() => String, {
    nullable: true,
    description: 'phone for user (optional)',
  })
  phone: string;

  @Field(() => String, { description: 'password for user' })
  password: string;

  @Field(() => Int, {
    nullable: true,
    description: 'user roleId (optional)',
  })
  roleId: number;
}

@InputType()
export class AddRoleToUserInput {
  @Field(() => Int)
  userId: number;

  @Field(() => [Int], {
    description: 'user roleId (optional)',
  })
  roleIds: number[];
}
