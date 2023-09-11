import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@app/constants/constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.getOrThrow('DB_TYPE') as 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('POSTGRES_DB_NAME').toString(),
        username: configService.getOrThrow('POSTGRES_DB_USERNAME'),
        password: configService.getOrThrow('POSTGRES_DB_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
