import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function appSwaggerSetting<T extends INestApplication>(app: T): void {
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('HEALING_AREA API DOCS')
    .setDescription('HEALING_AREA API 문서 입니다.')
    .setVersion('1.0')
    .addTag('')
    // 추후 토큰 인증시 사용
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'Bearer',
    //     bearerFormat: 'JWT',
    //     description:
    //       '인증이 필요한 API에는 로그인이 필요합니다. Bearer 토큰 값을 입력해주세요.',
    //     in: 'header',
    //   },
    //   'JWT-auth',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('HEALING_AREA_API_VERSION_PREFIX') + '/api-docs',
    app,
    document,
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );
}
