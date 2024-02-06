import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('likes-queue')
export class LikesConsumer {
  @Process('createLike')
  async handleTranscode(job: Job<unknown>) {
    console.log('Start transcoding...');
    console.log(job.data);
    console.log('Transcoding completed');
  }
}
