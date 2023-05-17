import { Injectable } from '@nestjs/common';
import { CreateAttributeValueInput } from './dto/create-attribute-value.input';
import { UpdateAttributeValueInput } from './dto/update-attribute-value.input';
import { AttributeValue } from './entities/attribute-value.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributesService } from 'src/attributes/attributes.service';

@Injectable()
export class AttributeValuesService {
  constructor(
    @InjectRepository(AttributeValue)
    private attributeValueModel: Repository<AttributeValue>,
    private AttributesService: AttributesService,
  ) {}

  async create(createAttributeValueInput: CreateAttributeValueInput) {
    const { name, attributeId } = createAttributeValueInput;

    const value = await this.attributeValueModel.create({
      name: name,
    });

    const attribute = await this.AttributesService.findOne(attributeId);
    value.attribute = attribute;
    return this.attributeValueModel.save(value);
  }

  findAll() {
    return this.attributeValueModel.find({
      relations: ['attribute'],
    });
  }

  findOne(id: number) {
    return this.attributeValueModel.findOneBy({ id });
  }

  async update(
    id: number,
    updateAttributeValueInput: UpdateAttributeValueInput,
  ) {
    const value = await this.findOne(id);
    Object.assign(value, updateAttributeValueInput);
    return this.attributeValueModel.save(value);
  }

  async remove(id: number) {
    const value = await this.findOne(id);
    const valueCopy = Object.assign({}, value);
    await this.attributeValueModel.remove(value);
    return valueCopy;
  }
}
