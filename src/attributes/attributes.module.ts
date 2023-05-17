import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesResolver } from './attributes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  providers: [AttributesResolver, AttributesService],
  exports: [AttributesService],
})
export class AttributesModule {}
