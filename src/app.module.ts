import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { OptionMiddleware } from './middleware/Option/Option.middleware';

@Module({
  imports: [
    // ... module imports
    ScheduleModule.forRoot(),
    LoggerModule.forRoot(),
    // 使用ConfigModule加载.env配置文件
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    // 为prisma注入env配置
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          prismaOptions: {
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {
  // 注册全局中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OptionMiddleware).forRoutes('*');
  }
}
