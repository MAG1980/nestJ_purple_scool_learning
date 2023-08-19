import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {ProductModel} from '../product/product.model/product.model';
import {FindProductDto} from '../product/dto/find-product.dto';
import {TopPageModel} from './top-page.model/top-page.model';
import {FindTopPageDto} from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
    //Название маршрута совпадает с названием метода-обработчика
    @Post('create')
    //Формируем тип DTO на основе ProductModel исключая свойство '_id', т.к. на этапе создания оно отсутствует.
    async create(@Body() dto: Omit<TopPageModel, '_id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string) {

    }

    @Delete(':id')
    async delete(@Param('id') id:string){

    }

    @Patch('id')
    //Получаем id из строкового параметра запроса, а обновлённые данные - из тела запроса
    async update(@Param('id') id:string, @Body() dto:TopPageModel){

    }

    //Для поиска продуктов по фильтру используем метод Post, т.к. передаём данные в теле запроса
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto){

    }
}
