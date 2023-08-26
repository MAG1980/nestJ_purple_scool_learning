import {ConfigService} from '@nestjs/config';
import {TypegooseModule, TypegooseModuleOptions} from 'nestjs-typegoose';

/**
 * Возвращает объект с настройками подключения к БД MongoDB
 * @param configService
 */
export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoConnectionString(configService),
        ...getMongoOptions(),
    }
}

/**
 * Возвращает стоку подключения к БД MongoDB
 * @param configService
 */
const getMongoConnectionString = (configService: ConfigService) =>
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTH_DATABASE')

/**
 * Возвращает объект с дополнительными (необязательными) настройками подключения к БД
 */
const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
})