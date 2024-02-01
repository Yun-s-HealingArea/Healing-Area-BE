import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryParameterDTO {
  @ApiProperty({ example: '1', description: '해당하는 Resource의 ID' })
  @IsNumberString()
  id?: string;
}
