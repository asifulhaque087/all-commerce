import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryModel: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const { title, photo, parentId } = createCategoryInput;

    const category = await this.categoryModel.create({
      title,
      photo,
      parentId,
    });

    return this.categoryModel.save(category);
  }

  findAll() {
    return this.categoryModel.find();
  }

  findOne(id: number) {
    return this.categoryModel.findOneBy({ id });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryInput);
    return this.categoryModel.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryModel.remove(category);
    return category;
  }
}
