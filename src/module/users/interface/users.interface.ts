import { Boards } from '../../boards/entities/boards.entity';
import { Likes } from '../../likes/entities/likes.entity';

export interface IUsers {
  email: string;

  name: string;

  password: string;

  birthday: Date;

  phoneNumber: string;

  refreshToken?: string | null;

  boards: Boards[];

  likes: Likes[];
}
