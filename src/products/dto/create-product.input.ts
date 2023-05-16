import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'name for product' })
  name: string;

  @Field(() => [ColorsWithImgs])
  colorsWithImages: ColorsWithImgs[];

  @Field(() => Int, { nullable: true })
  variationId: number;

  @Field(() => Int, { nullable: true })
  optionId: number;
}

@InputType()
export class AddOptionToProduct {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  variationId: number;

  @Field(() => Int)
  optionId: number;
}

@InputType()
export class CreateVariationInput {
  @Field(() => String, { description: 'name for variation' })
  name: string;
}

@InputType()
export class CreateOptionInput {
  @Field(() => String, { description: 'name for option' })
  name: string;

  @Field(() => Int, { nullable: true })
  variation: number;
}

@InputType()
export class CreateColorInput {
  @Field(() => String, { description: 'name for color' })
  name: string;
}

@InputType()
class ColorsWithImgs {
  @Field(() => Int)
  colorId: number;

  @Field(() => String)
  img: string;
}

@InputType()
export class AddColorToProduct {
  @Field(() => Int)
  productId: number;

  @Field(() => [ColorsWithImgs])
  colorsWithImages: ColorsWithImgs[];

  // @Field(() => [Int])
  // colorId: number[];

  // @Field(() => [String])
  // img: string[];
}

@InputType()
export class CreateCombinationInput {
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

  @Field(() => [String])
  variations: string[];
}
