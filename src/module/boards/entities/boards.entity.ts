import { Column, Entity, ManyToOne, OneToMany, VirtualColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract/abstract.entity';
import { Comments } from '../../comments/entities/comments.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Boards extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'varchar', default: 0 })
  likes: number;

  @Column({ name: 'image_link', type: 'varchar', nullable: true })
  imageLink: string;

  @Column({ name: 'is_private', type: 'boolean', default: false })
  isPrivate: boolean;

  @Column({ type: 'varchar', default: 'TODO' })
  status: string;

  @OneToMany(() => Comments, (comments) => comments.board)
  comments: Comments[];

  @ManyToOne(() => Users, (users) => users.boards)
  users: Users;
  // @VirtualColumn({
  //   query: (alias) =>
  //     `SELECT COUNT("id") FROM "comment" WHERE "postId" = ${alias}.id`,
  // })
  // commentCount: string;
}
