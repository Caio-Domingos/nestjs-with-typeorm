import { PartialType } from '@nestjs/mapped-types';
import { CreateMongoModelDto } from './create-mongo-model.dto';

export class UpdateMongoModelDto extends PartialType(CreateMongoModelDto) {}
