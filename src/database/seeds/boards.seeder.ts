import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Boards } from '../../module/boards/entities/boards.entity';
import { Comments } from '../../module/comments/entities/comments.entity';

export class BoardsSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const boardsFactory = factoryManager.get(Boards);
    const commentsFactory = factoryManager.get(Comments);
    const postGenerateRepeatTime = 50;
    const commentGenerateRepeatTime = 20;
    const post = await boardsFactory.saveMany(postGenerateRepeatTime);
    const generateComment = async () => {
      for (let i = 0; i < postGenerateRepeatTime; i++) {
        await commentsFactory.save({
          post: post[i],
        });
      }
    };
    for (let i = 0; i < commentGenerateRepeatTime; i++) {
      await generateComment();
    }
  }
}
