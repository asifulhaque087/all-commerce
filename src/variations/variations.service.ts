import { Injectable } from '@nestjs/common';
import { CreateVariationInput } from './dto/create-variation.input';
import { UpdateVariationInput } from './dto/update-variation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Variation, VariationValue } from './entities/variation.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { AttributesService } from 'src/attributes/attributes.service';
import { AttributeValuesService } from 'src/attribute-values/attribute-values.service';

@Injectable()
export class VariationsService {
  constructor(
    @InjectRepository(Variation) private variationModel: Repository<Variation>,
    @InjectRepository(VariationValue)
    private varvalModel: Repository<VariationValue>,
    private ProductsService: ProductsService,
    private AttributeValuesService: AttributeValuesService,
  ) {}

  async create(createVariationInput: CreateVariationInput) {
    const { productId, color, img, stock, price, values } =
      createVariationInput;

    const variation = await this.variationModel.create({
      color,
      img,
      stock,
      price,
    });

    const product = await this.ProductsService.findOne(productId);

    variation.product = product;

    await this.variationModel.save(variation);

    for (let i = 0; i < values.length; i++) {
      const value = await this.AttributeValuesService.findOne(values[i]);
      const cmbo = await this.varvalModel.create({
        variation,
        value,
      });
      await this.varvalModel.save(cmbo);
    }
    return variation;
  }

  findAll() {
    return `This action returns all variations`;
  }

  findOne(id: number) {
    return this.variationModel.findOneBy({ id });
  }

  async update(id: number, updateVariationInput: UpdateVariationInput) {
    const variation = await this.findOne(id);
    Object.assign(variation, updateVariationInput);
    return this.variationModel.save(variation);
  }

  async remove(id: number) {
    const variation = await this.findOne(id);
    const varitionCopy = Object.assign({}, variation);
    await this.variationModel.remove(variation);
    return varitionCopy;
  }
}
