import { Injectable } from '@nestjs/common';
import {
  AddColorToProduct,
  AddValueToProduct,
  CreateProductInput,
} from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Product,
  ProductAttributeValue,
  ProductColor,
} from './entities/product.entity';
import { Repository } from 'typeorm';
import { AttributesService } from 'src/attributes/attributes.service';
import { AttributeValuesService } from 'src/attribute-values/attribute-values.service';
import { ColorsService } from 'src/colors/colors.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productModel: Repository<Product>,
    @InjectRepository(ProductColor) private pcModel: Repository<ProductColor>,
    @InjectRepository(ProductAttributeValue)
    private pattvalModel: Repository<ProductAttributeValue>,
    // services
    private AttributesService: AttributesService,
    private AttributeValuesService: AttributeValuesService,
    private ColorsService: ColorsService,
  ) {}

  // products
  async create(createProductInput: CreateProductInput) {
    const { name, colorsWithImages, valuesWithAttributes } = createProductInput;

    const product = await this.productModel.create({
      name,
    });

    await this.productModel.save(product);

    // adding attribute values for product
    for (let i = 0; i < valuesWithAttributes.length; i++) {
      const { attributeId, valueId } = valuesWithAttributes[i];
      await this.addValueToProductUtil(product, attributeId, valueId);
    }
    // try this after all

    // await this.addValueToProduct({
    //   valuesWithAttributes,
    //   productId: product.id,
    // });

    // adding colors for product
    for (let i = 0; i < colorsWithImages.length; i++) {
      const { colorId, img } = colorsWithImages[i];
      await this.addColorToProductUtil(product, colorId, img);
    }

    return product;
  }

  async addValueToProduct(addValueToProduct: AddValueToProduct) {
    // destructure dto
    const { productId, valuesWithAttributes } = addValueToProduct;

    // finding product object
    const product = await this.findOne(productId);

    // adding options for product
    for (let i = 0; i < valuesWithAttributes.length; i++) {
      const { attributeId, valueId } = valuesWithAttributes[i];
      await this.addValueToProductUtil(product, attributeId, valueId);
    }

    return product;
  }

  async addValueToProductUtil(
    product: Product,
    attributeId: number,
    valueId: number,
  ) {
    // finding coresponding object
    const attribute = await this.AttributesService.findOne(attributeId);

    const value = await this.AttributeValuesService.findOne(valueId);

    // saving into product-variation-option table
    const pattval = await this.pattvalModel.create({
      product,
      attribute,
      value,
    });

    await this.pattvalModel.save(pattval);

    return pattval;
  }

  async removeValueFromProduct(id: number) {
    const pattval = await this.pattvalModel.findBy({ id });
    const pattvalCopy = Object.assign({}, pattval);
    await this.pattvalModel.remove(pattval);
    return pattvalCopy;
  }

  async findAll() {
    // const products = this.productModel.find({
    //   relations: ['pvos.variation.options'],
    // });

    const products = this.productModel
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.colors', 'pcFromProduct')
      .leftJoinAndSelect('pcFromProduct.color', 'colorFromPc')
      .leftJoinAndSelect(
        'colorFromPc.img',
        'pcFromColor',
        'pcFromColor.productId == product.id',
      )
      .leftJoinAndSelect('product.pattvals', 'pattvalFromProduct')
      .leftJoinAndSelect('pattvalFromProduct.attribute', 'attributeFromPattval')
      .leftJoinAndSelect(
        'attributeFromPattval.pattvals',
        'pattvalFromAttribute',
        'pattvalFromAttribute.productId == product.id',
      )
      .leftJoinAndSelect(
        'pattvalFromAttribute.value',
        'attributeValueFromPattval',
      )
      .leftJoinAndSelect('product.variations', 'variationFromProduct')
      .leftJoinAndSelect('variationFromProduct.varvals', 'varvalFromVariation')
      .leftJoinAndSelect('varvalFromVariation.value', 'valueFromVarval')
      .getMany();

    return products;
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

  // colors

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
    const color = await this.ColorsService.findOne(colorId);

    // saving into product-variation-option table
    const pc = await this.pcModel.create({
      product,
      color,
      img,
    });

    await this.pcModel.save(pc);

    return pc;
  }
}
