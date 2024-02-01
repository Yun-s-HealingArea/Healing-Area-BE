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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDataFromJWT } from '../../common/decorator/user.data.from.jwt.decorator';
import { ErrorMessage } from '../../common/enum/errormessage.enum';

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
      '사용자가 아이디/비밀번호로 로그인을 수행한다. 비밀번호는 영문+숫자+특수기호 16자 이하의 문자열이며 각각 1개 이상 포함되어야 한다.',
  })
  @ApiCreatedResponse({
    description:
      'Access Token [Response Body] / Refresh Token [Response Header]',
  })
  @ApiBadRequestResponse({
    description: `${ErrorMessage.USER_NOT_FOUND_OR_WRONG_PASSWORD} || Validation Failed Message`,
  })
  @ApiUnauthorizedResponse({ description: `${ErrorMessage.UNAUTHORIZED}` })
  @ApiBody({ type: LoginDTO })
  async logIn(@Body() loginDTO: LoginDTO, @Res() res: Response) {
    const token = await this.authService.logIn(loginDTO);
    //RefreshToken은 HttpOnly, SameSite=None, Secure를 담은 채 Header로 전송
    //AccessToken은 Response Body로 전송
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${
        token.refreshToken
      }; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'HEALING_AREA_REFRESH_EXPIRATION_TIME',
      )} SameSite=None; Secure;`,
    );
    // res.setHeader(
    //   'Set-Cookie',
    //   `accessToken=${
    //     token.accessToken
    //   }; Path=/; Max-Age=${this.configService.get(
    //     'HEALING_AREA_ACCESS_EXPIRATION_TIME',
    //   )} SameSite=None; Secure;`,
    // );
    res.json({
      statusCode: res.statusCode,
      data: { accessToken: token.accessToken },
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
  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '로그아웃',
    description:
      '인가된 사용자가 로그아웃 버튼을 눌렀을시 요청된 JWT의 payload 기반으로 로그아웃을 진행한다. Swagger 화면에서 로그아웃을 원하는 경우 먼저 문서 최상단 우측에 Access Token을 발급 받아야 한다.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('logout')
  async logOut(@Res() res: Response, @UserDataFromJWT() user: UserInfoDTO) {
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
