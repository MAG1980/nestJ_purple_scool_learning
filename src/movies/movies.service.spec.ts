import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //individual test
  it('Должна возвращаться 4', () => {
    //Тест будет успешно пройден, если результат вычисления выражения соответствует ожидаемому значенияю
    expect(2 + 3).toEqual(5);
  });

  describe('Тестирование метода getAll', () => {
    it('Должен возвращаться массив', () => {
      const result = service.getAll();
      //Проверка на отношение к типу данных Array
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Тестирование метода getOne', () => {
    it('Фильм должен существовать и иметь id=0', function () {
      //Помещаем в БД одну запись о фильме
      service.create({
        title: 'Film Name',
        year: 2005,
        genres: ['action', 'comedy'],
      });
      //Должен существовать
      expect(service.getOne(0)).toBeDefined();
      //Проверяем id полученной записи
      // expect(service.getOne(0).id).toEqual(0);
    });

    it('Должна возвращаться ошибка 404 ', function () {
      try {
        //Попытка получить заведомо несуществующую запись
        service.getOne(111);
      } catch (e) {
        //Проверяем, что объект ошибки является instance NotFoundException, которое в этом случае выбрасывает сервис
        expect(e).toBeInstanceOf(NotFoundException);
        //Проверяем текст сообщения ошибки
        // expect(e.message).toEqual(`Фильм с id=111 не найден!`);
      }
    });
  });
});
