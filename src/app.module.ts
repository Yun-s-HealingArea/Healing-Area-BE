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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeormConfig),
    AuthModule,
    UsersModule,
    TokenModule,
    BoardsModule,
    CommentsModule,
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
