import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Product,
  ProductAttributeValue,
  ProductColor,
} from './entities/product.entity';
import { AttributesModule } from 'src/attributes/attributes.module';
import { AttributeValuesModule } from 'src/attribute-values/attribute-values.module';
import { ColorsModule } from 'src/colors/colors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductColor, ProductAttributeValue]),
    AttributesModule,
    AttributeValuesModule,
    ColorsModule,
  ],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
