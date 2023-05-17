import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariationInput {
  @Field(() => Int)
  productId: number;

  @Field(() => String)
  color: string;

  @Field(() => String)
  img: string;

  @Field(() => Int)
  stock: number;

  @Field(() => Int)
  price: number;

  @Field(() => [Int])
  values: number[];
}
