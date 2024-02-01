import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 1, description: '게시글 번호' })
  readonly boardsId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '댓글 내용', description: '댓글 내용' })
  readonly description: string;
}
