import { Inject, Injectable } from '@nestjs/common';
import { TagEntity } from '@app/tags/entities/tag.entity';
import { Repository } from 'typeorm';
import { TAGS_REPOSITORY } from '@app/constants/constants';

@Injectable()
export class TagsService {
  constructor(
    /*    @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,*/
    @Inject(TAGS_REPOSITORY)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }
}
