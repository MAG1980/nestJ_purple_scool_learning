import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  //Выполняется перед запуском каждого теста
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'Film Name',
      year: 2005,
      genres: ['action', 'comedy'],
    });
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

    it('Должна возвращаться ошибка NotFoundException ', function () {
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

  describe('Тестирование метода remove', () => {
    it('Фильм удаляется', () => {
      //Помещаем в БД одну запись о фильме
      service.create({
        title: 'Film Name',
        year: 2005,
        genres: ['action', 'comedy'],
      });
      const allMoviesBeforeRemove = service.getAll();
      service.remove(0);
      const allMoviesAfterRemove = service.getAll();
      //Сравниваем длину массива с фильмами до и после удаления одного фильма
      expect(allMoviesAfterRemove.length).toBeLessThan(
        allMoviesBeforeRemove.length,
      );
      // expect(allMoviesAfterRemove.length).toEqual(allMoviesBeforeRemove.length - 1);
    });
    it('Должна вернуться ошибка NotFoundException', () => {
      try {
        service.remove(0);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Тестирование метода create', () => {
    it('Длина массива должна увеличиватья', () => {
      const allMoviesBeforeCreateLength = service.getAll().length;
      service.create({
        title: 'Film Name',
        year: 2005,
        genres: ['action', 'comedy'],
      });
      const allMoviesAfterCreateLength = service.getAll().length;
      expect(allMoviesAfterCreateLength).toBeGreaterThan(
        allMoviesBeforeCreateLength,
      );
    });

    it('Название созданного фильма должно совпадать', () => {
      service.create({
        title: 'Film Name',
        year: 2005,
        genres: ['action', 'comedy'],
      });
      expect(service.getOne(0).title).toEqual('Film Name');
    });
  });

  describe('Тестирование метода patch', () => {
    it('Фильм изменён', () => {
      service.patch(0, { title: 'Changed Film Name' });
      expect(service.getOne(0).title).toEqual('Changed Film Name');
    });

    it('Должна возвращаться ошибка NotFoundException', () => {
      try {
        service.patch(1000, { title: 'Changed Film Name' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  //Выполняется после окончания всех тестов. Может быть использована для удаления фейковых записей.
  aafterAll()
});
