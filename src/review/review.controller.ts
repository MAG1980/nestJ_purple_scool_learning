import { Body, Controller, Get, Delete, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {}

  //Название маршрута совпадает с названием метода-обработчика
  @Post('create')
  //Формируем тип DTO на основе ProductModel исключая свойство '_id', т.к. на этапе создания оно отсутствует.
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}
}
