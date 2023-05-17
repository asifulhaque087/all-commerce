import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValuesResolver } from './attribute-values.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributesModule } from 'src/attributes/attributes.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue]), AttributesModule],
  providers: [AttributeValuesResolver, AttributeValuesService],
  exports: [AttributeValuesService],
})
export class AttributeValuesModule {}
