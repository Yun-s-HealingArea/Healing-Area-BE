import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { typeormConfig } from './config/database/typeorm.config';
import { TokenModule } from './module/token/token.module';
import { BoardsModule } from './module/boards/boards.module';
import { CommentsModule } from './module/comments/comments.module';
import { JwtModule } from '@nestjs/jwt';
import { LikesModule } from './module/likes/likes.module';
import { BullModule } from '@nestjs/bull';
import { bullQueueConfig } from './config/bull/config/bullqueue.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    //TODO:수정 요망

    BullModule.forRootAsync(bullQueueConfig),
    EventEmitterModule.forRoot({
      global: true,
      maxListeners: 10,
    }),
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule,
    BoardsModule,
    CommentsModule,
    LikesModule,
    UsersModule,
    TokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('HEALING_AREA_JWT_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
