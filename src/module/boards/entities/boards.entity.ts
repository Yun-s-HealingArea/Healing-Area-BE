import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import { AbstractEntity } from '../../../common/abstract/abstract.entity';
import { Comments } from '../../comments/entities/comments.entity';
import { Users } from '../../users/entities/users.entity';
import { Likes } from '../../likes/entities/likes.entity';

@Entity()
@Index(['id', 'title'])
export class Boards extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ name: 'image_link', type: 'varchar', nullable: true })
  imageLink: string;

  @Column({ name: 'is_private', type: 'boolean', default: false })
  isPrivate: boolean;

  @Column({ type: 'varchar', default: 'TODO' })
  status: string;

  @OneToMany(() => Comments, (comments) => comments.boards)
  comments: Comments[];

  @ManyToOne(() => Users, (users) => users.boards)
  users: Users;

  @OneToMany(() => Likes, (likes) => likes.boards)
  likes: Likes[];

  @VirtualColumn({
    query: (alias) =>
      `SELECT COUNT("id") FROM "likes" WHERE "boardsId" = ${alias}.id`,
  })
  likesCount: number;

  // @VirtualColumn({
  //   query: (alias) =>
  //     `SELECT COUNT("id") FROM "comments" WHERE "boardsId" = ${alias}.id`,
  // })
  // commentCount: string;
}
