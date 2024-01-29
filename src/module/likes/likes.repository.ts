import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Likes } from './entities/likes.entity';

@Injectable()
export class LikesRepository extends Repository<Likes> {
  constructor(private dataSource: DataSource) {
    super(Likes, dataSource.createEntityManager());
  }
}
