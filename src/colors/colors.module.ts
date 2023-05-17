import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsResolver } from './colors.resolver';

@Module({
  providers: [ColorsResolver, ColorsService]
})
export class ColorsModule {}
