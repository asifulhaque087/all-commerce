import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UserRole } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany((type) => UserRole, (ur) => ur.role)
  @Field((type) => [UserRole])
  users: UserRole[];

  @OneToMany((type) => Permission, (prm) => prm.role)
  @Field((type) => [Permission])
  permissions: Permission[];
}
