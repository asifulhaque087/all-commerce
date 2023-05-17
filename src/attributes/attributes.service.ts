import { Injectable } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from './entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute) private attributeModel: Repository<Attribute>,
  ) {}

  async create(createAttributeInput: CreateAttributeInput) {
    const { name } = createAttributeInput;
    const attribute = await this.attributeModel.create({
      name,
    });
    return this.attributeModel.save(attribute);
  }

  findAll() {
    return this.attributeModel.find({
      relations: ['values'],
    });
  }

  findOne(id: number) {
    return this.attributeModel.findOneBy({ id });
  }

  async update(id: number, updateAttributeInput: UpdateAttributeInput) {
    const attribute = await this.findOne(id);
    Object.assign(attribute, updateAttributeInput);
    return this.attributeModel.save(attribute);
  }

  async remove(id: number) {
    const attribute = await this.findOne(id);
    const attributeCopy = Object.assign({}, attribute);
    await this.attributeModel.remove(attribute);
    return attributeCopy;
  }
}
