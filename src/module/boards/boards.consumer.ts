import { Process, Processor } from '@nestjs/bull';
import { BoardsService } from './boards.service';

@Processor('boards-queue')
export class BoardsConsumer {
  constructor(private readonly boardsService: BoardsService) {}
  @Process('increaseViews')
  async handleTranscode(job) {
    await this.boardsService.increaseViews(
      job.data.boardsId,
      job.data.eventName,
    );
    console.log('Start transcoding...');
    console.log(job.data);
    console.log('Transcoding completed');
  }
}
