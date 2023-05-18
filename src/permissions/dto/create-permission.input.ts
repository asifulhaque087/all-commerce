import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field(() => String, { description: 'action name' })
  action: string;

  @Field(() => String, { description: 'subject for action' })
  subject: string;
}
