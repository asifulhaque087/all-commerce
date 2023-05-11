import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Option, Product, Variation } from './entities/product.entity';
import {
  CreateOptionInput,
  CreateProductInput,
  CreateVariationInput,
} from './dto/create-product.input';
import {
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

  @Query(() => [Product], { name: 'variations' })
  findAllVariations() {
    return this.productsService.findAllVariations();
  }

  @Query(() => Product, { name: 'variation' })
  findOneVariation(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOneVariation(id);
  }

  @Mutation(() => Product)
  updateVariation(
    @Args('updateVariationInput') updateVariationInput: UpdateVariationInput,
  ) {
    return this.productsService.updateVariation(
      updateVariationInput.id,
      updateVariationInput,
    );
  }

  @Mutation(() => Product)
  removeVariation(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeVariation(id);
  }
}

// options
@Resolver(() => Variation)
export class OptionsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Variation)
  createOption(
    @Args('createVariationInput') createOptionInput: CreateOptionInput,
  ) {
    return this.productsService.createOption(CreateVariationInput);
  }

  @Query(() => [Product], { name: 'options' })
  findAllOptions() {
    return this.productsService.findAllOptions();
  }

  @Query(() => Product, { name: 'option' })
  findOneOption(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOneOption(id);
  }

  @Mutation(() => Product)
  updateOption(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.updateOption(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Option)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.removeOption(id);
  }
}
