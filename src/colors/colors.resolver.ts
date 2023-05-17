import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColorsService } from './colors.service';
import { Color } from './entities/color.entity';
import { CreateColorInput } from './dto/create-color.input';
import { UpdateColorInput } from './dto/update-color.input';

@Resolver(() => Color)
export class ColorsResolver {
  constructor(private readonly colorsService: ColorsService) {}

  @Mutation(() => Color)
  createColor(@Args('createColorInput') createColorInput: CreateColorInput) {
    return this.colorsService.create(createColorInput);
  }

  @Query(() => [Color], { name: 'colors' })
  findAll() {
    return this.colorsService.findAll();
  }

  @Query(() => Color, { name: 'color' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.colorsService.findOne(id);
  }

  @Mutation(() => Color)
  updateColor(@Args('updateColorInput') updateColorInput: UpdateColorInput) {
    return this.colorsService.update(updateColorInput.id, updateColorInput);
  }

  @Mutation(() => Color)
  removeColor(@Args('id', { type: () => Int }) id: number) {
    return this.colorsService.remove(id);
  }
}
