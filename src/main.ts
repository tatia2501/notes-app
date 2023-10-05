import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import hbs = require('hbs');
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions.filter';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Notes')
    .setDescription('The Notes App API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('note')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views', 'pages'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      P2000: HttpStatus.BAD_REQUEST,
      P2025: HttpStatus.NOT_FOUND,
    }),
  );

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  Logger.log(`Application is running on: http://localhost:3000`);
  Logger.log(`Swagger is running on: http://localhost:3000/api`);
  await app.listen(3000);
}
bootstrap();