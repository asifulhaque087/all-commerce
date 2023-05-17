import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class ValuesWithAttributes {
  @Field(() => Int)
  valueId: number;

  @Field(() => Int)
  attributeId: number;
}

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'name for product' })
  name: string;

  @Field(() => [ColorsWithImgs], { nullable: true })
  colorsWithImages: ColorsWithImgs[];

  @Field(() => [ValuesWithAttributes], { nullable: true })
  valuesWithAttributes: ValuesWithAttributes[];
}

@InputType()
export class AddValueToProduct {
  @Field(() => Int)
  productId: number;

  @Field(() => [ValuesWithAttributes])
  valuesWithAttributes: ValuesWithAttributes[];
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
}
