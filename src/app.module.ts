import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import createOrmConfig from './core/database/typeorm/ormconfig';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { createMongooseConfig } from './core/database/mongoose/mongooseconfig';
import { MongoModelModule } from './routes/mongo-model/mongo-model.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : process.env.NODE_ENV === 'container'
          ? '.env.container'
          : '.env.development',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => {
        const ormconfig = createOrmConfig({
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DB'),
          synchronize: configService.get('DB_SYNC'),
        });
        return ormconfig;
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // importe o ConfigModule
      useFactory: async (configService: ConfigService) => {
        const uri = createMongooseConfig({
          schema: configService.get<string>('MONGODB_SCHEME'),
          username: configService.get<string>('MONGODB_USERNAME'),
          password: configService.get<string>('MONGODB_PASSWORD'),
          cluster: configService.get<string>('MONGODB_CLUSTER'),
          database: configService.get<string>('MONGODB_DATABASE'),
          options: configService.get<string>('MONGODB_OPTIONS'),
        });

        // console.log(uri);

        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService], // injete o ConfigService
    }),
    TerminusModule,
    HttpModule,
    AuthModule,
    UserModule,
    MongoModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
