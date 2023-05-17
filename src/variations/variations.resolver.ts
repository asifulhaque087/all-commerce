import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VariationsService } from './variations.service';
import { Variation } from './entities/variation.entity';
import { CreateVariationInput } from './dto/create-variation.input';
import { UpdateVariationInput } from './dto/update-variation.input';

@Resolver(() => Variation)
export class VariationsResolver {
  constructor(private readonly variationsService: VariationsService) {}

  @Mutation(() => Variation)
  createVariation(@Args('createVariationInput') createVariationInput: CreateVariationInput) {
    return this.variationsService.create(createVariationInput);
  }

  @Query(() => [Variation], { name: 'variations' })
  findAll() {
    return this.variationsService.findAll();
  }

  @Query(() => Variation, { name: 'variation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.variationsService.findOne(id);
  }

  @Mutation(() => Variation)
  updateVariation(@Args('updateVariationInput') updateVariationInput: UpdateVariationInput) {
    return this.variationsService.update(updateVariationInput.id, updateVariationInput);
  }

  @Mutation(() => Variation)
  removeVariation(@Args('id', { type: () => Int }) id: number) {
    return this.variationsService.remove(id);
  }
}
