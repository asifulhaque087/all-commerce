import { BadRequestException, Injectable } from '@nestjs/common';
import { AddRoleToUserInput, CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userModel: Repository<User>,
    @InjectRepository(UserRole) private urModel: Repository<UserRole>,

    // services
    private RolesService: RolesService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { name, email, phone } = createUserInput;
    let { password } = createUserInput;

    // finding user
    let user = await this.userModel.findOneBy({ email });

    // if not user throw error
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    password = await bcrypt.hash(password, 12);

    // creating user instance
    user = this.userModel.create({
      name,
      email,
      password,
      phone,
    });

    // saving user
    this.userModel.save(user);

    // generate token
    const token = this.getSignedJwtToken(user);

    return token;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return this.userModel.findOneBy({ id });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    Object.assign(user, updateUserInput);
    return this.userModel.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    const userCopy = Object.assign({}, user);
    await this.userModel.remove(user);
    return userCopy;
  }
  // -- [[ crud end ]] --

  async addRoleToUser(id: number, addRoleToUserInput: AddRoleToUserInput) {
    // destructure dto
    const { userId, roleIds } = addRoleToUserInput;

    // finding user
    const user = await this.findOne(userId);

    for (let i = 0; i < roleIds.length; i++) {
      await this.addRoleToUserUtil(user, roleIds[i]);
    }

    return user;
  }

  async addRoleToUserUtil(user: User, roleId: number) {
    // finding coresponding instance
    const role = await this.RolesService.findOne(roleId);

    // saving into product-variation-option table
    const ur = this.urModel.create({
      user,
      role,
    });

    await this.urModel.save(ur);

    return ur;
  }

  // utils methods
  getSignedJwtToken(user: User) {
    return jwt.sign({ id: user.id }, 'MRIDUL', { expiresIn: '5h' });
  }

  // matchPassword(password: string) {
  //   return bcrypt.compare(password, this.password);
  // }
}
