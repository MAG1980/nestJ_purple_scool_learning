import { Module, Inject } from '@nestjs/common';
import { databaseProviders } from '@app/database/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
