import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appStartMessage } from './config/app/app.start.message';
import { appSetting } from './config/app/app.setting';
import { appSwaggerSetting } from './config/app/app.swagger.setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  모노 레포 사용시 apps 모듈에서 공통적으로 사용할 수 있음
  E2E 테스트시 실 서비스와 동일한 Interceptor 설정을 사용할 수 있음
 */
  appStartMessage(app);
  appSetting(app);
  appSwaggerSetting(app);
}

bootstrap();
