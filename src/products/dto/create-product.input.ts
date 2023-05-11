import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
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
}
