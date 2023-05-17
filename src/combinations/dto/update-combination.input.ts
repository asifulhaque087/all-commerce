import { CreateCombinationInput } from './create-combination.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCombinationInput extends PartialType(CreateCombinationInput) {
  @Field(() => Int)
  id: number;
}
