import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  OptionsResolver,
  ProductsResolver,
  VariationsResolver,
} from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Option,
  Product,
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
    ]),
  ],
  providers: [
    ProductsResolver,
    VariationsResolver,
    OptionsResolver,
    ProductsService,
  ],
})
export class ProductsModule {}
