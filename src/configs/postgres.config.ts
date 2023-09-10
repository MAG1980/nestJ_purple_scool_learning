import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();

const configService = new ConfigService();

const configOptions: PostgresConnectionOptions = {
  type: configService.getOrThrow('DB_TYPE'),
  host: configService.getOrThrow('DB_HOST'),
  port: configService.getOrThrow('DB_PORT'),
  database: configService.getOrThrow('POSTGRES_DB_NAME'),
  username: configService.getOrThrow('POSTGRES_DB_USERNAME'),
  password: configService.getOrThrow('POSTGRES_DB_PASSWORD'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => configOptions;

export default new DataSource(configOptions);
