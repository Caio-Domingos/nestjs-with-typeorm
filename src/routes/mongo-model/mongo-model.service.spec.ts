import { Test, TestingModule } from '@nestjs/testing';
import { MongoModelService } from './mongo-model.service';

describe('MongoModelService', () => {
  let service: MongoModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoModelService],
    }).compile();

    service = module.get<MongoModelService>(MongoModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
