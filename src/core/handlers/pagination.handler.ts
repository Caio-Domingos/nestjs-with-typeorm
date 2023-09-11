export interface PaginationConfig {
  take?: number;
  skip?: number;
  orderColumn?: string;
  order: 'ASC' | 'DESC';
}

export function createPaginationConfig(query: any) {
  const take: number = +query.take || 10;
  const skip: number = +query.skip || 0;
  const orderColumn: string = (query.orderColumn as string) || 'id';
  const order: 'ASC' | 'DESC' = (query.order as 'ASC' | 'DESC') || 'ASC';
  const paginationConfig: PaginationConfig = {
    take,
    skip,
    orderColumn,
    order,
  };

  return paginationConfig;
}
