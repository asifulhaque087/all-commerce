import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import {
  Color,
  Combination,
  Option,
  Product,
  ProductVariationOption,
  Variation,
} from './entities/product.entity';
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

// color
@Resolver(() => Color)
export class ColorsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Color)
  createColor(@Args('createColorInput') createColorInput: CreateColorInput) {
    return this.productsService.createColor(createColorInput);
  }

  @Query(() => [Color], { name: 'colors' })
  findAllColors() {
    return this.productsService.findAllColors();
  }

  @Query(() => Color, { name: 'color' })
  findOneColor(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOneColor(id);
  }

  @Mutation(() => Color)
  updateColor(@Args('updateColorInput') updateColorInput: UpdateColorInput) {
    return this.productsService.updateColor(
      updateColorInput.id,
      updateColorInput,
    );
  }

  @Mutation(() => Color)
  removeColor(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeColor(id);
  }

  @Mutation(() => Product)
  addColorToProduct(
    @Args('addColorToProduct') addColorToProduct: AddColorToProduct,
  ) {
    return this.productsService.addColorToProduct(addColorToProduct);
  }
}

// combination
@Resolver(() => Combination)
export class CombinationsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Combination)
  createCombination(
    @Args('createCombinationInput')
    createCombinationInput: CreateCombinationInput,
  ) {
    return this.productsService.createCombination(createCombinationInput);
  }

  @Mutation(() => Combination)
  updateCombination(
    @Args('updateCombinationInput')
    updateCombinationInput: UpdateCombinationInput,
  ) {
    return this.productsService.updateCombination(
      updateCombinationInput.id,
      updateCombinationInput,
    );
  }

  @Mutation(() => Combination)
  removeCombination(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeCombination(id);
  }
}
