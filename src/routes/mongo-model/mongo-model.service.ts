import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreServiceMongoose } from 'src/core/utils/core-service-mongoose.service';
import { MongoModel } from './entities/mongo-model.entity';

@Injectable()
export class MongoModelService extends CoreServiceMongoose<MongoModel> {
  constructor(
    @InjectModel('MongoModel')
    private mongoModelRepository: Model<MongoModel>,
  ) {
    super(mongoModelRepository);
  }
}
