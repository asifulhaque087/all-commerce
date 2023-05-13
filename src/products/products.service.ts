import { Injectable } from '@nestjs/common';
import {
  CreateOptionInput,
  CreateProductInput,
  CreateVariationInput,
} from './dto/create-product.input';
import {
  UpdateOptionInput,
  UpdateProductInput,
  UpdateVariationInput,
} from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Option,
  Product,
  ProductVariationOption,
  Variation,
} from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
    @InjectRepository(Variation) private variationModel: Repository<Variation>,
    @InjectRepository(Option) private optionModel: Repository<Option>,
    @InjectRepository(ProductVariationOption)
    private pvoModel: Repository<ProductVariationOption>,
  ) {}

  // products
  async create(createProductInput: CreateProductInput) {
    const { name, variation, option } = createProductInput;

    const product = await this.productModel.create({
      name,
    });

    await this.productModel.save(product);

    const nvariation = await this.findOneVariation(variation);
    const noption = await this.findOneOption(option);

    const pvo = await this.pvoModel.create({
      product,
      variation: nvariation,
      option: noption,
    });

    await this.pvoModel.save(pvo);

    return product;

    // product.variations = [nvariation];
    // product.options = [noption];

    // await this.productModel.save(product);
    // return product;
  }

  async findAll() {
    // const products = this.productModel.find({
    //   relations: ['pvos.variation.options'],
    // });

    // const products = this.productModel
    //   .createQueryBuilder('product')
    //   .leftJoinAndSelect('product.pvos', 'pvo')
    //   .leftJoinAndSelect('pvo.variation', 'vari')
    //   .leftJoinAndSelect('vari.options', 'option', 'option.id == product.id')
    //   .getMany();

    const products = this.productModel
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.pvos', 'pvo')
      .leftJoinAndSelect('pvo.variation', 'vari')
      .leftJoinAndSelect('vari.pvos', 'vpvo', 'vpvo.productId == product.id')
      .leftJoinAndSelect('vpvo.option', 'vop')
      .getMany();

    return products;

    // relations: ['variations.options', 'options'],

    // return this.productModel.find({
    //   relations: {
    //     variations: {
    //       options: true,
    //     },
    //   },

    //   where: {
    //     variations: {},
    //   },
    // });
    // const products = await this.productModel
    //   .createQueryBuilder()
    //   .select('*')
    //   .getRawMany();

    // const products = this.productModel
    //   .createQueryBuilder('product')
    //   .leftJoinAndSelect('product.variations', 'variation')
    //   .leftJoinAndSelect('product.options', 'poption')
    //   .getMany();

    // return products;
  }

  findOne(id: number) {
    return this.productModel.findOneBy({ id });
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductInput);
    return this.productModel.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    const productCopy = Object.assign({}, product);
    await this.productModel.remove(product);
    return productCopy;
  }

  // variations
  async createVariation(createVariationInput: CreateVariationInput) {
    const { name } = createVariationInput;
    const variation = await this.variationModel.create({
      name,
    });
    return this.variationModel.save(variation);
  }

  findAllVariations() {
    return this.variationModel.find({
      relations: ['options'],
    });
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
  async createOption(createOptionInput: CreateOptionInput) {
    const { name, variation } = createOptionInput;

    // const option = new this.optionModel();
    const option = await this.optionModel.create({
      name: name,
    });

    const ivariation = await this.findOneVariation(variation);
    option.variation = ivariation;
    return this.optionModel.save(option);
  }

  findAllOptions() {
    return this.optionModel.find({
      relations: ['variation', 'products'],
    });
  }

  findOneOption(id: number) {
    return this.optionModel.findOneBy({ id });
  }

  async updateOption(id: number, updateOptionInput: UpdateOptionInput) {
    const option = await this.findOneOption(id);
    Object.assign(option, updateOptionInput);
    return this.variationModel.save(option);
  }

  async removeOption(id: number) {
    const option = await this.findOneOption(id);
    const optionCopy = Object.assign({}, option);
    await this.optionModel.remove(option);
    return optionCopy;
  }
}
