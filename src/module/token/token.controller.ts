import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateRefreshTokenDTO } from './dto/create-refresh-token.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}
  @Post('refresh')
  @ApiOperation({
    summary: '액세스 토큰 갱신',
    description: '리프레시 토큰을 받아 검증 뒤 액세스 토큰을 갱신한다.',
  })
  @ApiBody({
    type: CreateRefreshTokenDTO,
  })
  async regenerateAccessToken(
    @Body() createRefreshTokenDTO: CreateRefreshTokenDTO,
  ) {
    return this.tokenService.regenerateAccessToken(createRefreshTokenDTO);
  }
}
