import { Injectable } from '@nestjs/common';
import {
  CreateProductInput,
  CreateVariationInput,
} from './dto/create-product.input';
import {
  UpdateProductInput,
  UpdateVariationInput,
} from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Option, Product, Variation } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
    @InjectRepository(Variation) private variationModel: Repository<Variation>,
    @InjectRepository(Option) private optionModel: Repository<Option>,
  ) {}

  // products
  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // variations
  async createVariation(createVariationInput: CreateVariationInput) {
    const { name } = createVariationInput;

    const category = await this.variationModel.create({
      name,
    });

    return this.variationModel.save(category);
  }

  findAllVariations() {
    return this.variationModel.find();
  }

  findOneVariation(id: number) {
    return this.variationModel.findOneBy({ id });
  }

  async updateVariation(
    id: number,
    updateVariationInput: UpdateVariationInput,
  ) {
    const variation = await this.findOneVariation(id);
    Object.assign(variation, updateVariationInput);
    return this.variationModel.save(variation);
  }

  async removeVariation(id: number) {
    const variation = await this.findOneVariation(id);
    const variationCopy = Object.assign({}, variation);
    await this.variationModel.remove(variation);
    return variationCopy;
  }

  // options
  createOption(createVariationInput: CreateVariationInput) {
    return 'This action adds a new product';
  }

  findAllOptions() {
    return `This action returns all products`;
  }

  findOneOption(id: number) {
    return `This action returns a #${id} product`;
  }

  updateOption(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  removeOption(id: number) {
    return `This action removes a #${id} product`;
  }
}
