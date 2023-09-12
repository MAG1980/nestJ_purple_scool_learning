import { DATA_SOURCE, TAGS_REPOSITORY } from '@app/constants/constants';
import { DataSource } from 'typeorm';
import { TagEntity } from '@app/tags/entities/tag.entity';

export const tagsProviders = [
  {
    provide: TAGS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TagEntity),
    inject: [DATA_SOURCE],
  },
];
