import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValue } from './entities/attribute-value.entity';
import { CreateAttributeValueInput } from './dto/create-attribute-value.input';
import { UpdateAttributeValueInput } from './dto/update-attribute-value.input';

@Resolver(() => AttributeValue)
export class AttributeValuesResolver {
  constructor(private readonly attributeValuesService: AttributeValuesService) {}

  @Mutation(() => AttributeValue)
  createAttributeValue(@Args('createAttributeValueInput') createAttributeValueInput: CreateAttributeValueInput) {
    return this.attributeValuesService.create(createAttributeValueInput);
  }

  @Query(() => [AttributeValue], { name: 'attributeValues' })
  findAll() {
    return this.attributeValuesService.findAll();
  }

  @Query(() => AttributeValue, { name: 'attributeValue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attributeValuesService.findOne(id);
  }

  @Mutation(() => AttributeValue)
  updateAttributeValue(@Args('updateAttributeValueInput') updateAttributeValueInput: UpdateAttributeValueInput) {
    return this.attributeValuesService.update(updateAttributeValueInput.id, updateAttributeValueInput);
  }

  @Mutation(() => AttributeValue)
  removeAttributeValue(@Args('id', { type: () => Int }) id: number) {
    return this.attributeValuesService.remove(id);
  }
}
