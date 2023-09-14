import { Test, TestingModule } from '@nestjs/testing';
import { MongoModelController } from './mongo-model.controller';
import { MongoModelService } from './mongo-model.service';

describe('MongoModelController', () => {
  let controller: MongoModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoModelController],
      providers: [MongoModelService],
    }).compile();

    controller = module.get<MongoModelController>(MongoModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
