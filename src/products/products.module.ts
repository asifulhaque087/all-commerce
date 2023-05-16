import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ColorsResolver,
  CombinationsResolver,
  OptionsResolver,
  ProductsResolver,
  VariationsResolver,
} from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Color,
  Combination,
  CombinationOption,
  Option,
  Product,
  ProductColor,
  ProductVariationOption,
  Variation,
} from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Variation,
      Option,
      ProductVariationOption,
      Color,
      ProductColor,
      Combination,
      CombinationOption,
    ]),
  ],
  providers: [
    ProductsResolver,
    VariationsResolver,
    OptionsResolver,
    ColorsResolver,
    CombinationsResolver,
    ProductsService,
  ],
})
export class ProductsModule {}
