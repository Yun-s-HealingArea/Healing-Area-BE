import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Boards } from './entities/boards.entity';

@Injectable()
export class BoardsRepository extends Repository<Boards> {
  constructor(private dataSource: DataSource) {
    super(Boards, dataSource.createEntityManager());
  }
}
