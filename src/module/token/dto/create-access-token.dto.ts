import { PickType } from '@nestjs/mapped-types';
import { CreateUserDTO } from '../../users/dto/create-user.dto';

export class CreateAccessTokenDTO extends PickType(CreateUserDTO, ['email']) {}
