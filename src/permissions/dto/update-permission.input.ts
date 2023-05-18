import { CreatePermissionInput } from './create-permission.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true, description: 'action name' })
  action: string;

  @Field(() => String, { nullable: true, description: 'subject for action' })
  subject: string;
}
