import { Model, Document } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

interface CoreSchemaTemplate extends Document {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  deleted?: boolean;
}

@Injectable()
export class CoreServiceMongoose<T extends CoreSchemaTemplate> {
  idProp: string;
  haveDeletedColumn: boolean;

  constructor(
    public model: Model<T>,
    entityConfigurations?: {
      idProp?: string;
      haveDeletedColumn?: boolean;
    },
  ) {
    this.idProp = entityConfigurations?.idProp || 'id';
    this.haveDeletedColumn = entityConfigurations?.haveDeletedColumn || false;
  }

  createWhere(query: any) {
    const where = {};
    // Code here

    return where;
  }

  async create(createDto: any) {
    try {
      const newItem = new this.model(createDto);
      return await newItem.save();
    } catch (error) {
      // Customize your error handling
    }
  }

  async createMany(items: any[]) {
    try {
      return await this.model.insertMany(items);
    } catch (error) {
      // Customize your error handling
    }
  }

  async findByFilter(query: any) {
    const where = this.createWhere(query);
    if (this.haveDeletedColumn) where['deleted'] = false;
    try {
      const items = await this.model
        .find(where)
        .limit(query.take)
        .skip(query.skip)
        .sort({ [query.orderColumn]: query.order || 'ASC' })
        .exec();

      const count = await this.model.countDocuments(where).exec();

      return {
        data: items,
        count,
      };
    } catch (error) {
      // Customize your error handling
    }
  }

  async findAll(relations?: string[]) {
    try {
      const item = await this.model.find().exec();
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      return item;
    } catch (error) {
      // Customize your error handling
    }
  }

  async findOne(id: any) {
    try {
      console.log('findOne', id);
      const item = await this.model.findById(id).exec();
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      return item;
    } catch (error) {
      // Customize your error handling
    }
  }

  async update(id: number, updateDto: any) {
    try {
      const updatedItem = await this.model.findByIdAndUpdate(id, updateDto, {
        new: true,
      });
      if (!updatedItem) {
        throw new NotFoundException('Item not found');
      }
      return updatedItem;
    } catch (error) {
      // Customize your error handling
    }
  }

  async updateMany(items: { id: string; data: any }[]) {
    try {
      console.log('updateMany', items);
      const updatePromises = items.map((item) => {
        return this.model
          .findByIdAndUpdate(
            item.id,
            item.data,
            { new: true }, // opção para retornar o documento atualizado
          )
          .exec(); // transforma a query em uma Promise
      });

      return await Promise.all(updatePromises);
    } catch (error) {
      // Personalize o seu tratamento de erro aqui
    }
  }

  async remove(id: number) {
    try {
      const item = await this.model.findById(id);
      console.log('remove', item);
      if (!item) {
        throw new NotFoundException('Item not found');
      }
      await this.model.findByIdAndDelete(id);
      return item;
    } catch (error) {
      // Customize your error handling
      console.log(error);
    }
  }
}
