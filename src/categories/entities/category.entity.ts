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

  @Column()
  @Field()
  photo?: string;

  @Column({ default: null })
  @Field((type) => Int)
  parentId?: number;

  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
}
