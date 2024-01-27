import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { generateMessageObject } from '../../common/function/generate.message.object.function';
import { UserInfoDTO } from './dto/user-info.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}
  async logIn(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const isExist = await this.usersService.isUserExist(email);
    if (!isExist)
      throw new BadRequestException([
        ErrorMessage.USER_NOT_FOUND_OR_WRONG_PASSWORD,
      ]);
    const isPasswordCorrect = await this.usersService.comparePassword(loginDTO);
    switch (isPasswordCorrect) {
      case true:
        const accessToken = this.tokenService.generateAccessToken(email);
        const refreshToken = this.tokenService.generateRefreshToken(email);
        const user = await this.usersService.findOneByEmail(email);
        await this.usersService.updateRefreshToken(user.id, refreshToken);
        return {
          accessToken,
          refreshToken,
        };
      case false:
        throw new BadRequestException([
          ErrorMessage.USER_NOT_FOUND_OR_WRONG_PASSWORD,
        ]);
    }
  }
  async logOut(user: UserInfoDTO) {
    if (!user) throw new UnauthorizedException([ErrorMessage.UNAUTHORIZED]);
    const userData = await this.usersService.findOneByEmail(user.userEmail);
    await this.usersService.updateRefreshToken(userData.id, null);
    return generateMessageObject(SuccessMessage.USER_LOGOUT);
  }
}
