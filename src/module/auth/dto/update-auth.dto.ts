import { PartialType } from '@nestjs/swagger';
import { LoginDTO } from './login.dto';

export class UpdateAuthDTO extends PartialType(LoginDTO) {}
