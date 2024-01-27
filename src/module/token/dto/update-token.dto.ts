import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessTokenDTO } from './create-access-token.dto';

export class UpdateTokenDTO extends PartialType(CreateAccessTokenDTO) {}
