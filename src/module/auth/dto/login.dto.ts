import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from '../../users/dto/create-user.dto';

export class LoginDTO extends PickType(CreateUserDTO, ['email', 'password']) {}
