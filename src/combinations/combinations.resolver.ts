import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CombinationsService } from './combinations.service';
import { Combination } from './entities/combination.entity';
import { CreateCombinationInput } from './dto/create-combination.input';
import { UpdateCombinationInput } from './dto/update-combination.input';

@Resolver(() => Combination)
export class CombinationsResolver {
  constructor(private readonly combinationsService: CombinationsService) {}

  @Mutation(() => Combination)
  createCombination(@Args('createCombinationInput') createCombinationInput: CreateCombinationInput) {
    return this.combinationsService.create(createCombinationInput);
  }

  @Query(() => [Combination], { name: 'combinations' })
  findAll() {
    return this.combinationsService.findAll();
  }

  @Query(() => Combination, { name: 'combination' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.combinationsService.findOne(id);
  }

  @Mutation(() => Combination)
  updateCombination(@Args('updateCombinationInput') updateCombinationInput: UpdateCombinationInput) {
    return this.combinationsService.update(updateCombinationInput.id, updateCombinationInput);
  }

  @Mutation(() => Combination)
  removeCombination(@Args('id', { type: () => Int }) id: number) {
    return this.combinationsService.remove(id);
  }
}
