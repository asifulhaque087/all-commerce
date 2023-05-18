import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleModel: Repository<Role>) {}

  create(createRoleInput: CreateRoleInput) {
    return 'This action adds a new role';
  }

  findAll() {
    return this.roleModel.find();
  }

  findOne(id: number) {
    return this.roleModel.findOneBy({ id });
  }

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
