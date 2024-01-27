import { AbstractEntity } from '../../../common/abstract/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Boards } from '../../boards/entities/boards.entity';

@Entity()
export class Comments extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', default: 0 })
  likes: number;

  @ManyToOne(() => Boards, (boards) => boards.comments)
  board: Boards;
}
