import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseModule } from '@app/database/database.module';
import { tagsProviders } from "@app/tags/ tags.providers";

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [...tagsProviders, TagsService],
})
export class TagsModule {}
