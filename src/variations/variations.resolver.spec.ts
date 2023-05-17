import { Test, TestingModule } from '@nestjs/testing';
import { VariationsResolver } from './variations.resolver';
import { VariationsService } from './variations.service';

describe('VariationsResolver', () => {
  let resolver: VariationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariationsResolver, VariationsService],
    }).compile();

    resolver = module.get<VariationsResolver>(VariationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
