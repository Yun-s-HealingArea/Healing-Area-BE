import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Comments } from './entities/comments.entity';

@Injectable()
export class CommentsRepository extends Repository<Comments> {
  constructor(private dataSource: DataSource) {
    super(Comments, dataSource.createEntityManager());
  }
}
