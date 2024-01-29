import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBoardDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
