import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsResolver } from './variations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variation, VariationValue } from './entities/variation.entity';
import { ProductsModule } from 'src/products/products.module';
import { AttributeValuesModule } from 'src/attribute-values/attribute-values.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Variation, VariationValue]),
    ProductsModule,
    AttributeValuesModule,
  ],
  providers: [VariationsResolver, VariationsService],
})
export class VariationsModule {}
