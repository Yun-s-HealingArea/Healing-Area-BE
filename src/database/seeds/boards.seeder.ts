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
    const boardsGenerateRepeatTime = 50;
    const commentGenerateRepeatTime = 20;
    const boards = await boardsFactory.saveMany(boardsGenerateRepeatTime);
    const generateComment = async () => {
      for (let i = 0; i < boardsGenerateRepeatTime; i++) {
        await commentsFactory.save({
          boards: boards[i],
        });
      }
    };
    for (let i = 0; i < commentGenerateRepeatTime; i++) {
      await generateComment();
    }
  }
}
