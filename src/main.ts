import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { DatabaseService } from './modules/database/database.service';

async function bootstrap() {
  const devMode = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  if (devMode) {
    const dataBaseService = app.get(DatabaseService);
    await dataBaseService.seedData();
  }

  const options = new DocumentBuilder()
    .setTitle('Signature API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
bootstrap();
