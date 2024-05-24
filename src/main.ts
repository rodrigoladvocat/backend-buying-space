import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Buying Space')
  .setDescription('Buying Space API description')
  .setVersion('6.9') // change it later
  .addTag('Cart')
  .addTag('Product')
  .addTag('User')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('infos', app, document);
  
  await app.listen(3000);
}
bootstrap();
