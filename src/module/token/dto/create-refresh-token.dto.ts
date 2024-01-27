import { IsJWT, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRefreshTokenDTO {
  @IsJWT()
  @IsString()
  @ApiProperty({
    example: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
    description: '리프레시 토큰',
  })
  refreshToken: string;
}
