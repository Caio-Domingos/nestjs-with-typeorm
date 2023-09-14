export function createMongooseConfig(data: {
  schema: string;
  username: string;
  password: string;
  cluster: string;
  database: string;
  options?: string;
}) {
  return `${data.schema}://${data.username}:${data.password}@${data.cluster}${
    data.database ? '/' : ''
  }${data.database || ''}${data.options ? '?' : ''}${data.options || ''}`;
}
