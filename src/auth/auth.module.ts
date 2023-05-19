import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  providers: [AuthService, CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AuthModule {}
