import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesRepository } from './likes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { BoardsModule } from '../boards/boards.module';
import { UsersModule } from '../users/users.module';
import { BullModule } from '@nestjs/bull';
import { LikesConsumer } from './likes.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Likes]),
    BoardsModule,
    UsersModule,
    BullModule.registerQueueAsync({
      name: 'likes-queue',
    }),
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesRepository, LikesConsumer],
})
export class LikesModule {}
