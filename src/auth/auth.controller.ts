import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import {AuthDto} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    //Рекомендуется называть метод контроллера так же, как и обрабатываемый им путь
    //Извлекаем тело запроса с помощью декоратора @Body(). Используем DI
    @Post('register')
    async register(@Body() dto:AuthDto){

    }

    //При login данные не модифицируются, поэтому возвращаем код ответа 200
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto:AuthDto){

    }
}
