import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AttributeValue } from 'src/attribute-values/entities/attribute-value.entity';
import { Attribute } from 'src/attributes/entities/attribute.entity';
import { Color } from 'src/colors/entities/color.entity';
import { Variation } from 'src/variations/entities/variation.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany((type) => ProductColor, (pc) => pc.product)
  @Field((type) => [ProductColor])
  colors: ProductColor[];

  @OneToMany((type) => ProductAttributeValue, (pattval) => pattval.product)
  @Field((type) => [ProductAttributeValue])
  pattvals: ProductAttributeValue[];

  @OneToMany((type) => Variation, (cmb) => cmb.product)
  @Field((type) => [Variation])
  variations: Variation[];
}

// ProductAttributeValue
@ObjectType()
@Entity()
export class ProductAttributeValue {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Product, (product) => product.pattvals)
  @Field((type) => Product)
  product: Product;

  @ManyToOne(() => Attribute, (att) => att.pattvals)
  @Field((type) => Attribute)
  attribute: Attribute;

  @ManyToOne(() => AttributeValue, (attval) => attval.pattvals)
  @Field((type) => AttributeValue)
  value: AttributeValue;
}

// ProductColor
@ObjectType()
@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  img: string;

  @ManyToOne(() => Product, (product) => product.colors)
  @Field((type) => Product)
  product: Product;

  @ManyToOne(() => Color, (col) => col.img)
  @Field((type) => Color)
  color: Color;
}

// produts: [
//   {
//     name: 'tshirt',
//     description: 'lorem ipsum dollar',
//     variations: [
//       {
//         name: 'color',
//         options: [
//           {
//             name: 'red',
//           },
//           {
//             name: 'green',
//           },
//         ],
//       },
//       {
//         name: 'size',
//         options: [
//           {
//             name: 'x',
//           },
//           {
//             name: 'l',
//           },
//         ],
//       },
//     ],
//     combination: [
//       {
//         stock: 10,
//         img: 'same color er image',
//         options: [{ name: 'red' }, { name: 'x' }],
//       },

//       {
//         stock: 10,
//         img: 'same color er image',
//         options: [{ name: 'red' }, { name: 'l' }],
//       },
//       {
//         stock: 10,
//         img: 'same color er image',
//         options: [{ name: 'green' }, { name: 'l' }],
//       },
//     ],
//   },
// ];

produts: [
  {
    name: 'tshirt',
    description: 'lorem ipsum dollar',
    variations: [
      {
        name: 'color',
        options: [
          {
            name: 'red',
          },
          {
            name: 'green',
          },
        ],
      },
      {
        name: 'size',
        options: [
          {
            name: 'x',
          },
          {
            name: 'l',
          },
        ],
      },
    ],
  },
];

produts: [
  {
    name: 'tshirt',
    description: 'lorem ipsum dollar',
    colors: [
      {
        color: 'red',
        img: 'color er image',
        multiImg: 'multiple image',
      },

      {
        color: 'green',
        img: 'color er image',
        multiImg: 'multiple image',
      },
    ],
    variations: [
      {
        name: 'size',
        options: [
          {
            name: 'x',
          },
          {
            name: 'l',
          },
        ],
      },
    ],
    combination: [
      {
        stock: 10,
        img: 'same color er image',
        color: 'red',
        multiImg: [{ url: '' }, { url: '' }],
        options: [{ name: 'x' }, { material: 'wood' }],
      },

      {
        stock: 10,
        img: 'same color er image',
        color: 'green',
        multiImg: [{ url: '' }, { url: '' }],
        options: [{ name: 'x' }, { material: 'wood' }],
      },
    ],
  },
];
