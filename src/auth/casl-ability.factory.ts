// import { Ability } from '@casl/ability';
import { PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

export enum PermissionAction {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
export type PermissionObjectType = any;

export type AppAbility = PureAbility<[PermissionAction, PermissionObjectType]>;

interface CaslPermission {
  action: PermissionAction;
  // In our database, Invoice, Project... are called "object"
  // but in CASL they are called "subject"
  subject: string;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}
  async createForUser(user: User): Promise<AppAbility> {
    const dbPermissions: Permission[] =
      await this.authService.findAllPermissionsOfUser(user.id);

    const caslPermissions: CaslPermission[] = dbPermissions.map((p) => ({
      action: PermissionAction[p.action],
      // subject: p.permissionObject,
      subject: p.subject,
    }));

    console.log('from casle permission ', caslPermissions);

    return new PureAbility<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
