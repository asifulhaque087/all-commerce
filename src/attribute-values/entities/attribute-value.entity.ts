import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { ProductAttributeValue } from 'src/products/entities/product.entity';
import { VariationValue } from 'src/variations/entities/variation.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => ProductAttributeValue, (pattval) => pattval.value)
  @Field((type) => [ProductAttributeValue])
  pattvals: ProductAttributeValue[];

  @ManyToOne((type) => Attribute, (variation) => variation.values)
  @Field((type) => Attribute)
  attribute: Attribute;

  @OneToMany((type) => VariationValue, (varval) => varval.variation)
  @Field((type) => [VariationValue])
  varvals: VariationValue[];
}
