import { Injectable } from '@nestjs/common';
import { CreateAttributeValueInput } from './dto/create-attribute-value.input';
import { UpdateAttributeValueInput } from './dto/update-attribute-value.input';

@Injectable()
export class AttributeValuesService {
  create(createAttributeValueInput: CreateAttributeValueInput) {
    return 'This action adds a new attributeValue';
  }

  findAll() {
    return `This action returns all attributeValues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attributeValue`;
  }

  update(id: number, updateAttributeValueInput: UpdateAttributeValueInput) {
    return `This action updates a #${id} attributeValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} attributeValue`;
  }
}
