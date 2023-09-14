import { Controller } from '@nestjs/common';
import { MongoModelService } from './mongo-model.service';
import { CoreController } from 'src/core/utils/core-controller.controller';
import { CreateMongoModelDto } from './dto/create-mongo-model.dto';
import { UpdateMongoModelDto } from './dto/update-mongo-model.dto';
import { MongoModel } from './entities/mongo-model.entity';

@Controller('mongo-model')
export class MongoModelController extends CoreController<
  MongoModel,
  MongoModelService,
  CreateMongoModelDto,
  UpdateMongoModelDto
> {
  constructor(private readonly mongoModelService: MongoModelService) {
    super(mongoModelService);
  }
}
