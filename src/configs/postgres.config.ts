import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<PostgresConnectionOptions> => ({
  type: configService.get('DB_TYPE'),
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('POSTGRES_DB_NAME'),
  username: configService.get('POSTGRES_DB_USERNAME'),
  password: configService.get('POSTGRES_DB_PASSWORD'),
});
