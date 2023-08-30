import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entiye';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  @Get()
  getAll(): Movie[] {
    return this.movies;
  }

  @Get(':id')
  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Фильм с id=${id} не найден!`);
    }
    return movie;
  }

  remove(id: number) {
    //Проверяем удаляемые данные на существование. Если они не существуют, автоматически срабатывет NotFoundException.
    this.getOne(id);
    //Возвращаем все записи, кроме искомой
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      //Формируем id: проверяем наличие записей в массие, если они отсутствуют, то присваиваем начальное значение
      id: this.movies.length ? this.movies[this.movies.length - 1].id + 1 : 0,
      ...movieData,
    });
  }

  patch(id: number, updateData: UpdateMovieDto) {
    /* Получаем из хранилища данные, в которые планируем внести изменения, одновременно проверяя их на существование.
    Если они не существуют, автоматически срабатывет NotFoundException.*/
    const movie = this.getOne(id);
    this.remove(id);
    //Помещаём в хранилище мёрдж из старых и обновлённых данных.
    this.movies.push({ ...movie, ...updateData });
  }
}
