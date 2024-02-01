import { IsNumberString } from 'class-validator';

export class QueryParameterDTO {
  @IsNumberString()
  id?: string;
}
