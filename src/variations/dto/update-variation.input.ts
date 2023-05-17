import { CreateVariationInput } from './create-variation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => Int)
  id: number;
}
