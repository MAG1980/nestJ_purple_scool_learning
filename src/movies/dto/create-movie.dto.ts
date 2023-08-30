//Поля, которые можно принимать от клиента при получении запросов.
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  //С помощью параметра each объекта ValidationOptions можно указать декоратору,что нужно проверять каждый элемент массива
  @IsOptional() //делает поле необязательным для заполнения
  @IsString({ each: true })
  readonly genres: string[];
}
