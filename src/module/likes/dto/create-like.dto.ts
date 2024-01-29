import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDTO {
  @IsNumber()
  @IsNotEmpty()
  usersId: number;

  @IsNumber()
  @IsNotEmpty()
  boardsId: number;
}
