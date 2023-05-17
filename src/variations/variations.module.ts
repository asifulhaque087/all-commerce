import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsResolver } from './variations.resolver';

@Module({
  providers: [VariationsResolver, VariationsService]
})
export class VariationsModule {}
