import { Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ErrorHandler } from '../handlers/error.handler';
import { createPaginationConfig } from '../handlers/pagination.handler';

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

export class CoreController<
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
      const itemId: any = isNaN(+id) ? id : +id;
      const item: Entity | null = await this.service.findOne(itemId, relations);
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

  @Patch('single/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDTO) {
    try {
      const itemId: any = isNaN(+id) ? id : +id;
      const update$: Entity = await this.service.update(itemId, updateDto);
      return update$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
  @Patch('many')
  async updateMany(@Body() updateDto: { id: number; data: UpdateDTO }[]) {
    try {
      const update$: Entity = await this.service.updateMany(updateDto);
      return update$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }

  @Delete('single/:id')
  async remove(@Param('id') id: string) {
    try {
      const itemId: any = isNaN(+id) ? id : +id;
      console.log(itemId);
      const remove$: Entity = await this.service.remove(itemId);
      return remove$;
    } catch (error) {
      throw new ErrorHandler(
        error.message,
        error.response?.errorCode || 400,
        error.response?.statusCode || 400,
      );
    }
  }
}
