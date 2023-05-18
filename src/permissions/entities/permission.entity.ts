import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  action: string;

  @Column()
  @Field()
  subject: string;

  @ManyToOne((type) => Role, (role) => role.permissions)
  @Field((type) => Role)
  role: Role;
}
