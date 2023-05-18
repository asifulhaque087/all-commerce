import { Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionModel: Repository<Permission>,
  ) {}

  async create(createPermissionInput: CreatePermissionInput) {
    const { action, subject } = createPermissionInput;

    const permission = this.permissionModel.create({
      action,
      subject,
    });

    return this.permissionModel.save(permission);
  }

  findAll() {
    return this.permissionModel.find();
  }

  findOne(id: number) {
    return this.permissionModel.findOneBy({ id });
  }

  update(id: number, updatePermissionInput: UpdatePermissionInput) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
