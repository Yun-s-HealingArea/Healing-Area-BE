import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { format } from 'date-fns';
import { DateFormat } from '../../common/enum/dateformat.enum';
import { UserInfoDTO } from './dto/user-info.dto';
import { LocalAuthGuard } from './guard/local.auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDataFromJWT } from '../../common/decorator/user.data.from.jwt.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description:
      '입력된 아이디/비밀번호로 로그인을 수행한다. 비밀번호는 영문+숫자+특수기호 16자 이하의 문자열이며 각각 1개 이상 포함되어야 한다.',
  })
  @ApiCreatedResponse({
    description: 'Return Access Token, Refersh Token [Header/Response Body]',
  })
  @ApiBadRequestResponse({
    description:
      'User Not Found or Password Is Wrong. Please Try Again || Validation Failed Message',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: LoginDTO })
  async logIn(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const token = await this.authService.logIn(loginDTO);
    //TODO: 삭제
    res.setHeader('accessToken', `${token.accessToken}`);
    res.setHeader('refreshToken', `${token.refreshToken}`);
    res.json({
      statusCode: res.statusCode,
      data: token,
      timeStamp: format(
        new Date(),
        DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT,
      ),
      path: `${this.configService.get<string>(
        'HEALING_AREA_API_VERSION_PREFIX',
      )}/auth/login`,
    });
  }
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  async logOut(@Res() res: Response, @UserDataFromJWT() user: UserInfoDTO) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({
      statusCode: res.statusCode,
      data: await this.authService.logOut(user),
      timeStamp: format(
        new Date(),
        DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT,
      ),
      path: `${this.configService.get<string>(
        'HEALING_AREA_API_VERSION_PREFIX',
      )}/auth/logout`,
    });
  }
}
