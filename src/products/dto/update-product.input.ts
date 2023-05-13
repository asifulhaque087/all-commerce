import {
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
