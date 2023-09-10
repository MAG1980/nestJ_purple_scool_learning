import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from '@app/tags/entities/tag.entity';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
