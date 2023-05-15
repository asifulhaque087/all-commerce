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

  @OneToMany((type) => ProductVariationOption, (pvo) => pvo.product)
  @Field((type) => [ProductVariationOption])
  pvos: ProductVariationOption[];

  // @ManyToMany((type) => Variation, (variation) => variation.products)
  // @JoinTable({
  //   name: 'product_variation_option',
  // })
  // @Field((type) => [Variation])
  // variations: Variation[];

  // @ManyToMany((type) => Option, (option) => option.products)
  // @JoinTable({
  //   name: 'product_variation_option',
  // })
  // @Field((type) => [Option])
  // options: Option[];
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

  @OneToMany((type) => ProductVariationOption, (pvo) => pvo.variation)
  @Field((type) => [ProductVariationOption])
  pvos: ProductVariationOption[];

  // @ManyToMany((type) => Product, (product) => product.variations)
  // @Field((type) => [Product])
  // products: Product[];

  // @ManyToMany((type) => Option, (option) => option.variations)
  // @Field((type) => [Option])
  // options: Option[];

  @OneToMany((type) => Option, (option) => option.variation)
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

  @OneToMany((type) => ProductVariationOption, (pvo) => pvo.option)
  @Field((type) => [ProductVariationOption])
  pvos: ProductVariationOption[];

  // @ManyToMany((type) => Product, (product) => product.options)
  // @Field((type) => [Product])
  // products: Product[];

  // @ManyToMany((type) => Variation, (variation) => variation.options)
  // @Field((type) => [Variation])
  // variations: Variation[];

  @ManyToOne((type) => Variation, (variation) => variation.options)
  @Field((type) => Variation)
  variation: Variation;
}

// productvariationoption
@ObjectType()
@Entity()
export class ProductVariationOption {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Product, (product) => product.pvos)
  @Field((type) => Product)
  product: Product;

  @ManyToOne(() => Variation, (vari) => vari.pvos)
  @Field((type) => Variation)
  variation: Variation;

  @ManyToOne(() => Option, (op) => op.pvos)
  @Field((type) => Option)
  option: Option;
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
