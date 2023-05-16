import {
  CreateColorInput,
  CreateCombinationInput,
  CreateOptionInput,
  CreateProductInput,
  CreateVariationInput,
} from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => Int, { nullable: true })
  option: number;
}

@InputType()
export class UpdateVariationInput extends PartialType(CreateVariationInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class UpdateOptionInput extends PartialType(CreateOptionInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Int, { nullable: true })
  variation: number;
}

@InputType()
export class UpdateColorInput extends PartialType(CreateColorInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class UpdateCombinationInput extends PartialType(
  CreateCombinationInput,
) {
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
