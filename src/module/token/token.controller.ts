import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateRefreshTokenDTO } from './dto/create-refresh-token.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @UseGuards(LocalAuthGuard)
  @Post('refresh')
  @ApiOperation({
    summary: '액세스 토큰 갱신',
    description: '리프레시 토큰을 받아 검증 뒤 액세스 토큰을 갱신한다.',
  })
  async regenerateAccessToken(
    @Body() createRefreshTokenDTO: CreateRefreshTokenDTO,
  ) {
    return this.tokenService.regenerateAccessToken(createRefreshTokenDTO);
  }
}
