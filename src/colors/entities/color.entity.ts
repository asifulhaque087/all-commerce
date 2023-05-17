import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ProductColor } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => ProductColor, (pc) => pc.color)
  @Field((type) => [ProductColor])
  img: ProductColor[];
}
