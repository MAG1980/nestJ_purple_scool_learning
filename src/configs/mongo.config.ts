import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

/**
 * Возвращет объект с параметрами конфигурации БД MongoDB
 * @param configService
 */
export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => ({
  uri: getMongoString(configService),
  ...getMongoOptions(),
});

/**
 * Возвращает строку подключения к БД MongoDB (Mongo connection string)
 * @param configService ConfigService
 */
const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTH_DATABASE');

/**
 * Возвращает объект с параметрами настройки БД MongoDB
 */
const getMongoOptions = () => ({
  useNewUrlParser: true, //парсить строку подключения
  // useCreateIndex: true, //создавать индексы. Больоьше не поддерживается. Включеена по умолчанию..
  useUnifiedTopology: true, //использовать единую топологию
});
