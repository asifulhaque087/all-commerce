import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsResolver } from './colors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './entities/color.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Color]), AuthModule],
  providers: [ColorsResolver, ColorsService],
  exports: [ColorsService],
})
export class ColorsModule {}
