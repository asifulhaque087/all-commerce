import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'name for role' })
  name: string;
}

@InputType()
export class AssignPermissionsToRoleInput {
  @Field(() => Int)
  roleId: number;

  @Field(() => [Int])
  permissionIds: number[];
}
