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
  updateMany(items: { id: number; data: any }[]): Promise<any>;
  remove(id: number): Promise<any>;
}

export class CoreReadonlyController<
  Entity,
  Service extends IsService,
  CreateDTO,
  UpdateDTO,
> {
  constructor(public service: Service) {}

  @Get()
  async findAll(@Query() query: any): Promise<Entity[]> {
    try {
      const relations: string[] = (query.relations as string)
        ? query.relations.split(',')
        : [];
      return this.service.findAll(relations);
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Get('/filter')
  findByFilter(@Query() query: any) {
    const q = { ...query, ...createPaginationConfig(query) };
    return this.service.findByFilter(q);
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string, @Query() query: any) {
    try {
      const relations: string[] = (query.relations as string)
        ? query.relations.split(',')
        : [];
      const item: Entity | null = await this.service.findOne(+id, relations);
      if (!item) {
        throw new ErrorHandler('Item não encontrado', 404, 404);
      }
      return item;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
