import { Injectable } from '@nestjs/common';
import {
  AddColorToProduct,
  AddOptionToProduct,
  CreateColorInput,
  CreateCombinationInput,
  CreateOptionInput,
  CreateProductInput,
  CreateVariationInput,
} from './dto/create-product.input';
import {
  UpdateColorInput,
  UpdateCombinationInput,
  UpdateOptionInput,
  UpdateProductInput,
  UpdateVariationInput,
} from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Color,
  Combination,
  CombinationOption,
  Option,
  Product,
  ProductColor,
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
    @InjectRepository(Color) private colorModel: Repository<Color>,
    @InjectRepository(ProductColor) private pcModel: Repository<ProductColor>,
    @InjectRepository(Combination)
    private combinationModel: Repository<Combination>,
    @InjectRepository(CombinationOption)
    private cmboModel: Repository<CombinationOption>,
  ) {}

  // products
  async create(createProductInput: CreateProductInput) {
    const { name, colorsWithImages, optionsWithVariations } =
      createProductInput;

    const product = await this.productModel.create({
      name,
    });

    await this.productModel.save(product);

    // adding options for product
    for (let i = 0; i < optionsWithVariations.length; i++) {
      const { optionId, variationId } = optionsWithVariations[i];
      await this.addOptionToProductUtil(product, variationId, optionId);
    }

    // adding colors for product
    for (let i = 0; i < colorsWithImages.length; i++) {
      const { colorId, img } = colorsWithImages[i];
      await this.addColorToProductUtil(product, colorId, img);
    }

    return product;
  }

  async addOptionToProduct(addOptionToProduct: AddOptionToProduct) {
    // destructure dto
    const { productId, optionsWithVariations } = addOptionToProduct;

    // finding product object
    const product = await this.findOne(productId);

    // adding options for product
    for (let i = 0; i < optionsWithVariations.length; i++) {
      const { optionId, variationId } = optionsWithVariations[i];
      await this.addOptionToProductUtil(product, variationId, optionId);
    }

    return product;
  }

  async addOptionToProductUtil(
    product: Product,
    variationId: number,
    optionId: number,
  ) {
    // finding coresponding object
    const variation = await this.findOneVariation(variationId);
    const option = await this.findOneOption(optionId);

    // saving into product-variation-option table
    const pvo = await this.pvoModel.create({
      product,
      variation,
      option,
    });

    await this.pvoModel.save(pvo);

    return pvo;
  }

  async removeOptionFromProduct(id: number) {
    const pvo = await this.pvoModel.findBy({ id });
    const pvoCopy = Object.assign({}, pvo);
    await this.pvoModel.remove(pvo);
    return pvoCopy;
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

    // const products = this.productModel
    //   .createQueryBuilder('product')
    //   .leftJoinAndSelect('product.pvos', 'pvo')
    //   .leftJoinAndSelect('pvo.variation', 'vari')
    //   .leftJoinAndSelect('vari.pvos', 'vpvo', 'vpvo.productId == product.id')
    //   .leftJoinAndSelect('vpvo.option', 'vop')
    //   .getMany();

    const products = this.productModel
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.colors', 'pcolor')
      .leftJoinAndSelect('pcolor.color', 'imgcolor')
      .leftJoinAndSelect(
        'imgcolor.img',
        'aimgcolor',
        'aimgcolor.productId == product.id',
      )
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
      relations: ['variation'],
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

  // colors
  async createColor(createColorInput: CreateColorInput) {
    const { name } = createColorInput;

    // const option = new this.optionModel();
    const color = await this.colorModel.create({
      name: name,
    });

    return this.colorModel.save(color);
  }

  async addColorToProduct(addColorToProduct: AddColorToProduct) {
    // destructure dto
    const { productId, colorsWithImages } = addColorToProduct;

    // finding product object
    const product = await this.findOne(productId);

    for (let i = 0; i < colorsWithImages.length; i++) {
      const { colorId, img } = colorsWithImages[i];
      await this.addColorToProductUtil(product, colorId, img);
    }

    return product;
  }

  async addColorToProductUtil(product: Product, colorId: number, img: string) {
    // finding coresponding object
    const color = await this.findOneColor(colorId);

    // saving into product-variation-option table
    const pc = await this.pcModel.create({
      product,
      color,
      img,
    });

    await this.pcModel.save(pc);

    return pc;
  }

  findAllColors() {
    return this.colorModel.find();
  }

  findOneColor(id: number) {
    return this.colorModel.findOneBy({ id });
  }

  async updateColor(id: number, updateColorInput: UpdateColorInput) {
    const color = await this.findOneColor(id);
    Object.assign(color, updateColorInput);
    return this.colorModel.save(color);
  }

  async removeColor(id: number) {
    const color = await this.findOneColor(id);
    const colorCopy = Object.assign({}, color);
    await this.colorModel.remove(color);
    return colorCopy;
  }

  // combinations
  async createCombination(createCombinationInput: CreateCombinationInput) {
    const { productId, color, img, stock, price } = createCombinationInput;

    const combination = await this.combinationModel.create({
      color,
      img,
      stock,
      price,
    });

    const product = await this.findOne(productId);

    combination.product = product;

    return this.combinationModel.save(combination);
  }

  findAllCombinationsByProduct() {
    return this.colorModel.find();
  }

  findOneCombination(id: number) {
    return this.combinationModel.findOneBy({ id });
  }

  async updateCombination(
    id: number,
    updateCombinationInput: UpdateCombinationInput,
  ) {
    const combination = await this.findOneCombination(id);
    Object.assign(combination, updateCombinationInput);
    return this.combinationModel.save(combination);
  }

  async removeCombination(id: number) {
    const combination = await this.findOneCombination(id);
    const combinationCopy = Object.assign({}, combination);
    await this.combinationModel.remove(combination);
    return combinationCopy;
  }
}
