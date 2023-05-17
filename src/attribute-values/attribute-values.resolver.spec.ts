import { Test, TestingModule } from '@nestjs/testing';
import { AttributeValuesResolver } from './attribute-values.resolver';
import { AttributeValuesService } from './attribute-values.service';

describe('AttributeValuesResolver', () => {
  let resolver: AttributeValuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeValuesResolver, AttributeValuesService],
    }).compile();

    resolver = module.get<AttributeValuesResolver>(AttributeValuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
