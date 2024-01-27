import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TokenType } from '../../../common/enum/token.enum';

export class UsersInfoDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@example.com',
    description: '토큰 페이로드 내 이메일',
  })
  readonly userEmail: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  readonly iss: string;
  @IsString()
  @Matches(TokenType.ACCESS_TOKEN)
  @IsNotEmpty()
  readonly sub: string;
  @IsInt()
  @IsPositive()
  readonly iat: number;
  @IsInt()
  @IsPositive()
  readonly exp: number;
}
