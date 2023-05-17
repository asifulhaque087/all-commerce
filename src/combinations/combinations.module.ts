import { Module } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationsResolver } from './combinations.resolver';

@Module({
  providers: [CombinationsResolver, CombinationsService]
})
export class CombinationsModule {}
