import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'demo set up with app module' })
export class App {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
