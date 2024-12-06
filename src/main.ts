import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Generativ API Kit')
    .setDescription('NestJS based MistralAI, OpenAI Proxy Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000, '127.0.0.1');
  const url = await app.getUrl(); // Get the URL where the app is running
  Logger.log(`Server is running at: ${url}`); // Log using NestJS Logger
}
bootstrap();