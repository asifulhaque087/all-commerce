import { Test, TestingModule } from '@nestjs/testing';
import { CombinationsResolver } from './combinations.resolver';
import { CombinationsService } from './combinations.service';

describe('CombinationsResolver', () => {
  let resolver: CombinationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinationsResolver, CombinationsService],
    }).compile();

    resolver = module.get<CombinationsResolver>(CombinationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
