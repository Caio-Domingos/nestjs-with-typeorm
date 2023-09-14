import { Module } from '@nestjs/common';
import { MongoModelService } from './mongo-model.service';
import { MongoModelController } from './mongo-model.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModelSchema } from './entities/mongo-model.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MongoModel', schema: MongoModelSchema },
    ]),
  ],
  controllers: [MongoModelController],
  providers: [MongoModelService],
})
export class MongoModelModule {}
