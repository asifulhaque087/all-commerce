import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'name for product' })
  name: string;

  @Field(() => Int, { nullable: true })
  variation: number;

  @Field(() => Int, { nullable: true })
  option: number;
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
