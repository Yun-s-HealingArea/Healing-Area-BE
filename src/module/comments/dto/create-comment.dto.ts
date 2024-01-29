import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly boardsId: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
