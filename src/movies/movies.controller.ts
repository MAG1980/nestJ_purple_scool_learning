import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from '@app/movies/entities/movie.entiye';
import { MoviesService } from '@app/movies/movies.service';
import { CreateMovieDto } from '@app/movies/dto/create-movie.dto';
import { UpdateMovieDto } from '@app/movies/dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  /*  @Get('search')
    search(@Query('year') searchingYear: string) {
      return `Фильм, выпущенный после ${searchingYear} года`;
    }*/

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.remove(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.patch(movieId, updateData);
  }
}
