import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleModel: Repository<Role>) {}

  async create(createRoleInput: CreateRoleInput) {
    const { name } = createRoleInput;

    const role = this.roleModel.create({
      name,
    });

    return this.roleModel.save(role);
  }

  findAll() {
    return this.roleModel.find();
  }

  findOne(id: number) {
    return this.roleModel.findOneBy({ id });
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleInput);
    return this.roleModel.save(role);
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
