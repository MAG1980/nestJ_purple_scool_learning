import { Inject, Injectable } from '@nestjs/common';
import { TagEntity } from '@app/tags/entities/tag.entity';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@app/constants/constants';

@Injectable()
export class TagsService {
  constructor(
    /*    @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,*/
    @Inject(DATA_SOURCE) private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.dataSource.getRepository(TagEntity).find();
  }
}
