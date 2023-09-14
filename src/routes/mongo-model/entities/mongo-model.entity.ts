import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreDocument, CoreSchema } from 'src/core/models/CoreModel.model';

@Schema({ timestamps: true })
export class MongoModel extends CoreDocument {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const MongoModelSchema = SchemaFactory.createForClass(MongoModel);
MongoModelSchema.add(CoreSchema.obj);
