import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //Регистрируем глобальную "воронку" валидации
  app.useGlobalPipes(
    new ValidationPipe({
      //свойства, не описанные декораторами пакета class-validator в DTO, будут отброшены ValidationPipe
      whitelist: true,
      //отклонение запросов, не удовлетворяющих критериям DTO. Формирование ответа с ошибкой (более жёсткое правило).
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
