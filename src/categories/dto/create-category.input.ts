import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'title for category' })
  title: string;

  @Field({ nullable: true })
  photo: string;

  @Field(() => Int, { nullable: true })
  parentId: number;
}
