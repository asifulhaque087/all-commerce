import { Injectable } from '@nestjs/common';
import {
  AssignPermissionsToRoleInput,
  CreateRoleInput,
} from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleModel: Repository<Role>,
    // services
    private PermissionsService: PermissionsService,
  ) {}

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

  async remove(id: number) {
    const role = await this.findOne(id);
    const roleCopy = Object.assign({}, role);
    await this.roleModel.remove(role);
    return roleCopy;
  }
  // -- [[ crud end ]] --

  async assignPermissionsToRole(
    assignPermissionsToRoleInput: AssignPermissionsToRoleInput,
  ) {
    // destructure dto
    const { roleId, permissionIds } = assignPermissionsToRoleInput;

    // finding role
    const role = await this.findOne(roleId);

    for (let i = 0; i < permissionIds.length; i++) {
      await this.assignPermissionToRoleUtil(role, permissionIds[i]);
    }

    return role;
  }

  async assignPermissionToRoleUtil(role: Role, permissionId: number) {
    // finding coresponding instance
    const permission = await this.PermissionsService.findOne(permissionId);
    // assigning permission to role
    role.permissions = [permission];
    // saving the role
    await this.roleModel.save(role);
    return role;
  }
}
