import { CreateAttributeValueInput } from './create-attribute-value.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAttributeValueInput extends PartialType(CreateAttributeValueInput) {
  @Field(() => Int)
  id: number;
}
