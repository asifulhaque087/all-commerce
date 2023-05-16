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

  @OneToMany((type) => ProductColor, (pc) => pc.product)
  @Field((type) => [ProductColor])
  colors: ProductColor[];

  @OneToMany((type) => ProductVariationOption, (pvo) => pvo.product)
  @Field((type) => [ProductVariationOption])
  pvos: ProductVariationOption[];

  @OneToMany((type) => Combination, (cmb) => cmb.product)
  @Field((type) => [Combination])
  combinations: Combination[];

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

  @OneToMany((type) => CombinationOption, (cmbp) => cmbp.combination)
  @Field((type) => [CombinationOption])
  cmbs: ProductColor[];
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

// colors
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

// Combination table
@ObjectType()
@Entity()
export class Combination {
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

  @ManyToOne(() => Product, (product) => product.combinations)
  @Field((type) => Product)
  product: Product;

  @OneToMany((type) => CombinationOption, (cmbp) => cmbp.combination)
  @Field((type) => [CombinationOption])
  cmbs: CombinationOption[];
}

// combinaiton option
@ObjectType()
@Entity()
export class CombinationOption {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Combination, (cmb) => cmb.cmbs)
  @Field((type) => Combination)
  combination: Combination;

  @ManyToOne(() => Option, (cmb) => cmb.cmbs)
  @Field((type) => Option)
  option: Option;
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
