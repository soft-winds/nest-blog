import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './modules/system/users/users.module';
import { RolesModule } from './modules/system/roles/roles.module';
import { LogsModule } from './modules/system/logs/logs.module';
import * as Joi from 'joi';
import { ConfigEnum } from './enum/config';
// 根据环境变量加载不同的配置文件
const envFilePath = [`config/.env.${process.env.NODE_ENV}`, `config/.env`];
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath,
    // 验证环境变量
    validationSchema: Joi.object({
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_HOST: Joi.alternatives().try(Joi.string().ip(), Joi.string().domain()).required(),
      DATABASE_USERNAME: Joi.string().required(),
      DATABASE_PASSWORD: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_SYNC: Joi.boolean().required(),
    })
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        type: configService.get(ConfigEnum.DATABASE_TYPE),
        host: configService.get(ConfigEnum.DATABASE_HOST),
        port: configService.get(ConfigEnum.DATABASE_PORT),
        username: configService.get(ConfigEnum.DATABASE_USERNAME),
        password: configService.get(ConfigEnum.DATABASE_PASSWORD),
        database: configService.get(ConfigEnum.DATABASE_NAME),
        synchronize: configService.get(ConfigEnum.DATABASE_SYNC),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      } as TypeOrmModuleOptions;
    }
  }),
    UsersModule, RolesModule, LogsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
