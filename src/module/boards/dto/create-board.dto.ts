import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '제목', description: '게시글 제목' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '내용', description: '게시글 내용' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '유저 번호' })
  readonly userId: number;
}
