import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import {
  Option,
  Product,
  ProductVariationOption,
  Variation,
} from './entities/product.entity';
import {
  AddOptionToProduct,
  CreateOptionInput,
  CreateProductInput,
  CreateVariationInput,
} from './dto/create-product.input';
import {
  UpdateOptionInput,
  UpdateProductInput,
  UpdateVariationInput,
} from './dto/update-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  // products
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => ProductVariationOption)
  addOptionToProduct(
    @Args('addOptionToProduct') addOptionToProduct: AddOptionToProduct,
  ) {
    return this.productsService.addOptionToProduct(addOptionToProduct);
  }

  @Mutation(() => ProductVariationOption)
  removeOptionFromProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeOptionFromProduct(id);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}

// variations
@Resolver(() => Variation)
export class VariationsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Variation)
  createVariation(
    @Args('createVariationInput') createVariationInput: CreateVariationInput,
  ) {
    return this.productsService.createVariation(createVariationInput);
  }

  @Query(() => [Variation], { name: 'variations' })
  findAllVariations() {
    return this.productsService.findAllVariations();
  }

  @Query(() => Variation, { name: 'variation' })
  findOneVariation(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOneVariation(id);
  }

  @Mutation(() => Variation)
  updateVariation(
    @Args('updateVariationInput') updateVariationInput: UpdateVariationInput,
  ) {
    return this.productsService.updateVariation(
      updateVariationInput.id,
      updateVariationInput,
    );
  }

  @Mutation(() => Variation)
  removeVariation(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeVariation(id);
  }
}

// options
@Resolver(() => Option)
export class OptionsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Option)
  createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    return this.productsService.createOption(createOptionInput);
  }

  @Query(() => [Option], { name: 'options' })
  findAllOptions() {
    return this.productsService.findAllOptions();
  }

  @Query(() => Option, { name: 'option' })
  findOneOption(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOneOption(id);
  }

  @Mutation(() => Option)
  updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.productsService.updateOption(
      updateOptionInput.id,
      updateOptionInput,
    );
  }

  @Mutation(() => Option)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeOption(id);
  }
}
