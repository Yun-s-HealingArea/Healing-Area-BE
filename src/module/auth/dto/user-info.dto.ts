import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';
import { TokenType } from '../../../common/enum/token.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@example.com',
    description: '토큰 페이로드 내 이메일',
  })
  readonly userEmail: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'https://www.yun-healing-area.store' })
  readonly iss: string;
  @IsString()
  @Matches(TokenType.ACCESS_TOKEN)
  @IsNotEmpty()
  @ApiProperty({ example: 'accessToken', description: '토큰 타입' })
  readonly sub: string;
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 1620000000, description: '토큰 발급 시간' })
  readonly iat: number;
  @IsInt()
  @IsPositive()
  @ApiProperty({ example: 1620000001, description: '토큰 만료 시간' })
  readonly exp: number;
}
