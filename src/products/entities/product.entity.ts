import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @OneToMany((type) => Option, (option) => option.variation)
  @Field((type) => [Option])
  voptions: Option[];
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

  @ManyToOne((type) => Variation, (variation) => variation.voptions)
  @Field((type) => Variation)
  variation: Variation;
}

// @Entity()
// export class ProductVariationOption {
//   @ManyToOne((type) => Product, (product) => product.variationOptions)
//   product: Product;

//   @ManyToOne((type) => Variation, (variation) => variation.variationOptions)
//   variation: Variation;

//   @ManyToOne((type) => Option, (option) => option.variationOptions)
//   option: Option;
// }

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
