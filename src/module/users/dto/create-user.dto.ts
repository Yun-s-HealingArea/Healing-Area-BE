import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@example.com', description: '이메일' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'exampleuser1234!', description: '비밀번호' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '김철수', description: '이름' })
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2000-01-01', description: '생년월일' })
  readonly birthday: Date;

  @IsPhoneNumber('KR')
  @IsNotEmpty()
  @ApiProperty({ example: '010-1234-1234', description: '휴대폰번호' })
  readonly phoneNumber: string;
}
