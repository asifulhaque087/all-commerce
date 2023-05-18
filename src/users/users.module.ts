import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole]), RolesModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
