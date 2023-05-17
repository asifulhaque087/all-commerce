import { Injectable } from '@nestjs/common';
import { CreateCombinationInput } from './dto/create-combination.input';
import { UpdateCombinationInput } from './dto/update-combination.input';

@Injectable()
export class CombinationsService {
  create(createCombinationInput: CreateCombinationInput) {
    return 'This action adds a new combination';
  }

  findAll() {
    return `This action returns all combinations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} combination`;
  }

  update(id: number, updateCombinationInput: UpdateCombinationInput) {
    return `This action updates a #${id} combination`;
  }

  remove(id: number) {
    return `This action removes a #${id} combination`;
  }
}
