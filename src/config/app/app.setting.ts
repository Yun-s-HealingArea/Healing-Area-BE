import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { TransformInterceptor } from '../../common/interceptor/transform.interceptor';

export function appSetting<T extends INestApplication>(app: T): void {
  const configService = app.get(ConfigService);
  /*
  NestJS 유효성 검사 Pipe 설정
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * whitelist: DTO에 없는 속성은 무조건 필터링 할것인지?
       * forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생 시킬것인지?
       * transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체인데,
       *            해당 객체를 DTO로 변환을 원하는지?
       * disableErrorMessages: Error가 발생 했을 때 Error Message를 표시할 것인지?
       *                       배포 환경에서는 true 권장
       **/
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
      // transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false,
    }),
  );
  /*
  app Response Success Format 통일을 위한 Global Interceptor
   */
  app.useGlobalInterceptors(new TransformInterceptor());
  /*
  /*
  app Response Failed Format 통일을 위한 http-exceptions-filter  */
  app.useGlobalFilters(new HttpExceptionFilter());
  /*
  NestJS 전역 접두사 설정
   */
  app.setGlobalPrefix(configService.get('HEALING_AREA_API_VERSION_PREFIX'));
  /*
  app CORS
   */
  app.enableCors({
    origin: ['http://localhost:3000', configService.get('HEALING_AREA_URL')],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
    maxAge: 3600,
    optionsSuccessStatus: 204,
  });

  app.listen(configService.get('PORT'));
}
