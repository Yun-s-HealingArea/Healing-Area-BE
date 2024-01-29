import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { CommentsRepository } from './comments.repository';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), BoardsModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
