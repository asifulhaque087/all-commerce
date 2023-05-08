import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field({ nullable: true })
  photo: string;

  @Field(() => Int, { nullable: true })
  parentId: number;
}
