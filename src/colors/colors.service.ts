import { Injectable } from '@nestjs/common';
import { CreateColorInput } from './dto/create-color.input';
import { UpdateColorInput } from './dto/update-color.input';
import { Color } from './entities/color.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ColorsService {
  constructor(@InjectRepository(Color) private colorModel: Repository<Color>) {}

  async create(createColorInput: CreateColorInput) {
    const { name } = createColorInput;

    const color = await this.colorModel.create({
      name: name,
    });

    return this.colorModel.save(color);
  }

  findAll() {
    return this.colorModel.find();
  }

  findOne(id: number) {
    return this.colorModel.findOneBy({ id });
  }

  async update(id: number, updateColorInput: UpdateColorInput) {
    const color = await this.findOne(id);
    Object.assign(color, updateColorInput);
    return this.colorModel.save(color);
  }

  async remove(id: number) {
    const color = await this.findOne(id);
    const colorCopy = Object.assign({}, color);
    await this.colorModel.remove(color);
    return colorCopy;
  }
}
