import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column({ default: null })
  @Field({ nullable: true })
  photo?: string;

  @Column({ default: null })
  @Field(() => Int, { nullable: true })
  parentId?: number;

  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
}
