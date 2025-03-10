import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import 'multer';
import { HttpExceptionFilterFilter } from './filter/HttpExceptionFilter/HttpExceptionFilter.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AuthKey } from './constant/constant';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('body-parser-xml')(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // body-parser-xml xml解析
  app.use(
    bodyParser.xml({
      xmlParseOptions: {
        explicitArray: false, // 始终返回数组。 默认情况下只有数组元素数量大于 1 是才返回数组。
      },
    }),
  );

  // 全局配置
  app
    .setGlobalPrefix('api')
    .useGlobalFilters(new HttpExceptionFilterFilter())
    .useGlobalPipes(new ValidationPipe());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('抽奖助手')
    .setDescription('抽奖助手 API 文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: AuthKey,
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors({
    origin: /.*/,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: `Content-Type, Accept, Authorization, ${AuthKey}`,
  });

  await app.listen(env.PORT);
  console.log('server running. env=>', env.NODE_ENV, env.PORT);
}
bootstrap();
