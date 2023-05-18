import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @Column()
  @Field()
  password: string;

  @OneToMany((type) => UserRole, (ur) => ur.user)
  @Field((type) => [UserRole])
  roles: UserRole[];
}

// UserRole
@ObjectType()
@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.roles)
  @Field((type) => User)
  user: User;

  @ManyToOne(() => Role, (role) => role.users)
  @Field((type) => Role)
  role: Role;
}
