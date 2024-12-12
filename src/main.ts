import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();

  const config = new DocumentBuilder()
  .setDescription('Person API')
  .setVersion('1.0')
  .addTag('person')
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentation', app, documentFactory);
  app.listen(process.env.SERVER_PORT || 3003, () => console.log(`Application is listening on port ${process.env.SERVER_PORT || 3003}.`));
}
bootstrap();
