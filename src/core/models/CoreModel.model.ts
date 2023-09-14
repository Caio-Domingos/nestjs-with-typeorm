import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Ative as marcas de tempo aqui
export class CoreDocument extends Document {
  // Não precisamos mais definir manualmente `createdAt` e `updatedAt`

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ default: false })
  deleted: boolean;
}

export const CoreSchema = SchemaFactory.createForClass(CoreDocument);
