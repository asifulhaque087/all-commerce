import { Injectable } from '@nestjs/common';
import { CreateVariationInput } from './dto/create-variation.input';
import { UpdateVariationInput } from './dto/update-variation.input';

@Injectable()
export class VariationsService {
  create(createVariationInput: CreateVariationInput) {
    return 'This action adds a new variation';
  }

  findAll() {
    return `This action returns all variations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variation`;
  }

  update(id: number, updateVariationInput: UpdateVariationInput) {
    return `This action updates a #${id} variation`;
  }

  remove(id: number) {
    return `This action removes a #${id} variation`;
  }
}
