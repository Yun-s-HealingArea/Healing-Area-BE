import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDTO {
  @IsEmail()
  @IsNotEmpty()
  usersEmail: string;

  @IsNumber()
  @IsNotEmpty()
  boardsId: number;
}
