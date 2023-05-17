import { Injectable } from '@nestjs/common';
import { CreateColorInput } from './dto/create-color.input';
import { UpdateColorInput } from './dto/update-color.input';

@Injectable()
export class ColorsService {
  create(createColorInput: CreateColorInput) {
    return 'This action adds a new color';
  }

  findAll() {
    return `This action returns all colors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} color`;
  }

  update(id: number, updateColorInput: UpdateColorInput) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
