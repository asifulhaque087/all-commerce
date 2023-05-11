import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany((type) => Variation, (variation) => variation.products)
  @JoinTable()
  @Field((type) => [Variation])
  variations: Variation[];

  @ManyToMany((type) => Option, (option) => option.products)
  @JoinTable({
    name: 'product_variation_option',
    joinColumns: [{ name: 'product_id' }],
    inverseJoinColumns: [{ name: 'option_id' }],
  })
  @Field((type) => [Option])
  options: Option[];
}

// variations
@ObjectType()
@Entity()
export class Variation {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany((type) => Product, (product) => product.variations)
  @Field((type) => [Product])
  products: Product[];

  @ManyToMany((type) => Option, (option) => option.variations)
  @JoinTable({
    name: 'product_variation_option',
    joinColumns: [{ name: 'variation_id' }],
    inverseJoinColumns: [{ name: 'option_id' }],
  })
  @Field((type) => [Option])
  options: Option[];
}

// options
@ObjectType()
@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany((type) => Product, (product) => product.options)
  @Field((type) => [Product])
  products: Product[];

  @ManyToMany((type) => Variation, (variation) => variation.options)
  @Field((type) => [Variation])
  variations: Variation[];
}
