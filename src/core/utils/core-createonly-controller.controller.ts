import { Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ErrorHandler } from '../handlers/error.handler';
import { createPaginationConfig } from '../handlers/pagination.handler';

interface HasId {
  id: number;
}

interface IsService {
  create(createDto: any): Promise<any>;
  createMany(items: any[]): Promise<any>;
  findAll(relations?: string[]): Promise<any>;
  findByFilter(query: any): Promise<any>;
  findOne(id: number, relations?: string[]): Promise<any>;
  update(id: number, updateDto: any): Promise<any>;
  updateMany(items: { id: any; data: any }[]): Promise<any>;
  remove(id: number): Promise<any>;
}

export class CoreCreateonlyController<
  Entity,
  Service extends IsService,
  CreateDTO,
  UpdateDTO,
> {
  constructor(public service: Service) {}

  @Post('/single')
  async create(@Body() createDto: CreateDTO) {
    try {
      const create$: Entity = await this.service.create(createDto);
      return create$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
  @Post('/many')
  async createMany(@Body() createDto: CreateDTO[]) {
    try {
      const create$: Entity = await this.service.createMany(createDto);
      return create$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
