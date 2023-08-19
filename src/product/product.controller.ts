import {Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode} from '@nestjs/common';
import {ProductModel} from './product.model/product.model';
import {FindProductDto} from './dto/find-product.dto';

@Controller('product')
export class ProductController {
    //Название маршрута совпадает с названием метода-обработчика
    @Post('create')
    //Формируем тип DTO на основе ProductModel исключая свойство '_id', т.к. на этапе создания оно отсутствует.
    async create(@Body() dto: Omit<ProductModel, '_id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string) {

    }

    @Delete(':id')
    async delete(@Param('id') id:string){

    }

    @Patch('id')
    //Получаем id из строкового параметра запроса, а обновлённые данные - из тела запроса
    async update(@Param('id') id:string, @Body() dto:ProductModel){

    }

    //Для поиска продуктов по фильтру используем метод Post, т.к. передаём данные в теле запроса
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto){

    }
}
