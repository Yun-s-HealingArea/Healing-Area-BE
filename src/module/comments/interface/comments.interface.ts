import { Boards } from '../../boards/entities/boards.entity';

export interface IComments {
  description: string;

  boards: Boards;
}
