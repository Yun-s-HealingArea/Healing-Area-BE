import { AbstractEntity } from '../../../common/abstract/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Boards } from '../../boards/entities/boards.entity';
import { IComments } from '../interface/comments.interface';

@Entity()
export class Comments extends AbstractEntity implements IComments {
  @Column({ type: 'varchar', length: 500 })
  description: string;

  @ManyToOne(() => Boards, (boards) => boards.comments)
  boards: Boards;
}
