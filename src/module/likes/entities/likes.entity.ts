import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Boards } from '../../boards/entities/boards.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Boards, (boards) => boards.likes)
  boards: Boards;

  @ManyToOne(() => Users, (users) => users.likes)
  users: Users;
}
