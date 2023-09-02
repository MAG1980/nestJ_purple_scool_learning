import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  //Для каждого эндпойнта создаём отдельный блок describe
  describe('/movies', () => {
    it('GET', () => {
      //Вызов app.getHttpServer() позволяет не указывать доменное имя
      //Ожидаем получить в ответе пустой массив, т.к. БД пока пуста
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Film Name',
          year: 2005,
          genres: ['action', 'comedy'],
        })
        .expect(201);
    });

    //Bad request в случае отправки полей, которые запрещены валидатором
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Film Name',
          hacked: true,
        })
        .expect(400);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      //Пользуемся единым экземпляром приложения с предыдущими тестами (в частности - POST)
      return request(app.getHttpServer()).get('/movies/0').expect(200);
    });

    it('GET 404', () => {
      //Пользуемся единым экземпляром приложения с предыдущими тестами (в частности - POST)
      return request(app.getHttpServer()).get('/movies/1').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer()).patch('/movies/0').expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer()).patch('/movies/1').expect(404);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/0').expect(200);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(404);
    });
  });
});
