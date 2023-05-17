import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from 'src/attribute-values/entities/attribute-value.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Variation {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  color: string;

  @Column()
  @Field()
  img: string;

  @Column()
  @Field((type) => Int)
  stock: number;

  @Column()
  @Field((type) => Int)
  price: number;

  @ManyToOne(() => Product, (product) => product.variations)
  @Field((type) => Product)
  product: Product;

  @OneToMany((type) => VariationValue, (varval) => varval.variation)
  @Field((type) => [VariationValue])
  varvals: VariationValue[];
}

// variation value
@ObjectType()
@Entity()
export class VariationValue {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Variation, (varval) => varval.varvals)
  @Field((type) => Variation)
  variation: Variation;

  @ManyToOne(() => AttributeValue, (attval) => attval.varvals)
  @Field((type) => AttributeValue)
  value: AttributeValue;
}
