// config/ormconfig.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function createOrmConfig(connData: {
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  synchronize: string;
}): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: connData.host || 'localhost',
    port: parseInt(connData.port, 10) || 5432,
    username: connData.username || 'postgres',
    password: connData.password || '12345678',
    database: connData.database || 'mydb',
    entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
    synchronize: connData.synchronize === 'true',
  };
}

export default createOrmConfig;
