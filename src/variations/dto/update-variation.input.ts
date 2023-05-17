import { CreateVariationInput } from './create-variation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  color: string;

  @Field(() => String, { nullable: true })
  img: string;

  @Field(() => Int, { nullable: true })
  stock: number;

  @Field(() => Int, { nullable: true })
  price: number;
}
