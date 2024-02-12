import { Comments } from '../../comments/entities/comments.entity';
import { Likes } from '../../likes/entities/likes.entity';

export interface IBoards {
  title: string;

  description: string;

  imageFileURL: string;

  isPrivate: boolean;

  boardStatus: number;

  views: number;

  comments: Comments[];

  likes: Likes[];

  likesCount: number;
}
