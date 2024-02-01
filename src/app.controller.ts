import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  @ApiOperation({
    summary: '서버 상태 확인',
    description: '서버 상태를 확인한다.',
  })
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
