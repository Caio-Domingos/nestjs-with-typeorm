import { Repository } from 'typeorm';
import { translateTypeORMError } from '../functions/typeorm.utils';
import { ErrorHandler } from '../handlers/error.handler';

interface Entity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  deleted?: boolean;
}
export class CoreService<T extends Entity> {
  idProp: string;
  haveDeletedColumn: boolean;

  constructor(
    public repository: Repository<T>,
    private entityConfigurations?: {
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
      // Create a new item
      const newItem = this.repository.create(createDto);

      // Save item in database
      const create$ = await this.repository.save(newItem);
      return create$;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async createMany(items: any[]) {
    try {
      items.map(async (item) => {
        return this.create(item);
      });
      const res = await Promise.all(items);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw translateTypeORMError(error);
    }
  }

  async findByFilter(query: any) {
    console.log(query);
    const where = this.createWhere(query);
    if (this.haveDeletedColumn) where['deleted'] = false;

    const orderColumnProp =
      query.orderColumn === 'id' ? this.idProp : query.orderColumn;
    try {
      const results = await this.repository.findAndCount({
        where,
        relations: query.relations ? query.relations.split(',') : [],
        take: query.take,
        skip: query.skip,
        order: {
          [orderColumnProp]: query.order || 'ASC',
        },
      });

      return {
        data: results[0],
        count: results[1],
      };
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findAll(relations?: string[]) {
    try {
      // Create a new item
      const where = {};
      if (this.haveDeletedColumn) where['deleted'] = false;
      const rel = relations ? relations : [];
      return await this.repository.find({
        where,
        relations: rel,
      });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async findOne(id: number, relations?: string[]) {
    try {
      const whereId: any = {};
      whereId[this.idProp] = id;
      if (this.haveDeletedColumn) whereId['deleted'] = false;
      const rel = relations ? relations : [];
      const item = await this.repository.findOne({
        where: whereId,
        relations: rel,
      });

      return item;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async update(id: number, updateDto: any) {
    try {
      // Check if item exists
      const whereId: any = {};
      whereId[this.idProp] = id;
      if (this.haveDeletedColumn) whereId['deleted'] = false;

      const item = await this.repository.findOne({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }

      // Create a new item
      console.log(updateDto);
      const dto = { id, ...updateDto };
      const newItem: any = this.repository.create(dto);
      console.log(newItem);
      // Save item in database
      await this.repository.update(id, newItem);

      // Get updated item
      return await this.repository.findOne({ where: whereId });
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async updateMany(items: { id: number; data: any }[]) {
    try {
      console.log('updateMany', items);
      items.map(async (item) => {
        return this.update(item.id, item.data);
      });

      return await Promise.all(items);
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }

  async remove(id: number) {
    try {
      // Check if item exists
      const whereId: any = {};
      whereId[this.idProp] = id;
      if (this.haveDeletedColumn) whereId['deleted'] = false;

      const item = await this.repository.findOne({
        where: whereId,
      });

      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }
      if (this.haveDeletedColumn) {
        // Delete item
        await this.repository.delete(id);
        return item;
      } else {
        const data: any = { ...item, deleted: true, deletedAt: new Date() };
        // Delete item
        await this.update(data.id, data.data);
      }
      return item;
    } catch (error) {
      throw translateTypeORMError(error);
    }
  }
}
