import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import { BoardsSeeder } from './seeds/boards.seeder';
import PostFactory from './factory/boards.factory';
import CommentFactory from './factory/comment.factory';
import { Boards } from '../module/boards/entities/boards.entity';
import { Comments } from '../module/comments/entities/comments.entity';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Boards, Comments],
  seeds: [BoardsSeeder],
  factories: [PostFactory, CommentFactory],
};

// export default new DataSource({
//   type: 'postgres',
//   host: 'host.docker.internal',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'postgres',
//
//   entities: [__dirname + '../**/*.entity.{js,ts}'],
// });
export const dataSource = new DataSource(options);
