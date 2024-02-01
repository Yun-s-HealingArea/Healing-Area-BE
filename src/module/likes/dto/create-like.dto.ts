import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@email.com',
    description: '토큰 내 이메일(좋아요를 누른 유저)',
  })
  readonly usersEmail: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '게시글 번호' })
  readonly boardsId: number;
}
