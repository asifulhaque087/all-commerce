import { Module } from '@nestjs/common';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValuesResolver } from './attribute-values.resolver';

@Module({
  providers: [AttributeValuesResolver, AttributeValuesService]
})
export class AttributeValuesModule {}
