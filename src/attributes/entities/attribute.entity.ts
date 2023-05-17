import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from 'src/attribute-values/entities/attribute-value.entity';
import { ProductAttributeValue } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => ProductAttributeValue, (pattval) => pattval.attribute)
  @Field((type) => [ProductAttributeValue])
  pattvals: ProductAttributeValue[];

  @OneToMany((type) => AttributeValue, (attval) => attval.attribute)
  @Field((type) => [AttributeValue])
  values: AttributeValue[];
}
