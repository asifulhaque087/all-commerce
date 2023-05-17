import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttributeValueInput {
  @Field(() => String, { description: 'name for attribute-value' })
  name: string;

  @Field(() => Int, { nullable: true })
  attributeId: number;
}
