import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from './entities/boards.entity';
import { BoardsRepository } from './boards.repository';
import { UsersModule } from '../users/users.module';
import { UploadModule } from '../upload/upload.module';
import { BoardsConsumer } from './boards.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Boards]),
    UsersModule,
    UploadModule,
    BullModule.registerQueueAsync({
      name: 'boards-queue',
    }),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, BoardsConsumer],
  exports: [BoardsService],
})
export class BoardsModule {}
