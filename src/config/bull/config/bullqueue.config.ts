import { SharedBullAsyncConfiguration } from '@nestjs/bull/dist/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const bullQueueConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    name: 'hello-queue',
    redis: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};
