import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRefreshTokenDTO } from './dto/create-refresh-token.dto';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  generateAccessToken(email: string) {
    const payload = {
      userEmail: email,
      iss: this.configService.get<string>('HEALING_AREA_JWT_ISSUER'),
      sub: this.configService.get<string>('HEALING_AREA_ACCESS_SUBJECT'),
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        'HEALING_AREA_ACCESS_EXPIRATION_TIME',
      ),
    });
  }
  generateRefreshToken(email: string) {
    const payload = {
      userEmail: email,
      tokenId: uuid(),
      iss: this.configService.get<string>('HEALING_AREA_JWT_ISSUER'),
      sub: this.configService.get<string>('HEALING_AREA_REFRESH_SUBJECT'),
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        'HEALING_AREA_REFRESH_EXPIRATION_TIME',
      ),
    });
  }
  async regenerateAccessToken(createRefreshTokenDTO: CreateRefreshTokenDTO) {
    const payload = await this.jwtService.verifyAsync(
      createRefreshTokenDTO.refreshToken,
    );

    const { userEmail, iat, exp, ...userInfos } = payload;
    const user =
      await this.usersService.findOneAndReturnRefreshToken(userEmail);

    const isRefreshTokenExist =
      user.refreshToken === createRefreshTokenDTO.refreshToken;

    //TODO: IF문 최적화
    if (!isRefreshTokenExist)
      throw new BadRequestException([ErrorMessage.BAD_TOKEN]);
    if (!user) throw new BadRequestException([ErrorMessage.USER_NOT_FOUND]);
    const accessToken = this.generateAccessToken(userEmail);
    return { accessToken };
  }
}
