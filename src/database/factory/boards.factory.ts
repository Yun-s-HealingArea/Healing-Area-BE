import { setSeederFactory } from 'typeorm-extension';
import { Boards } from '../../module/boards/entities/boards.entity';

export default setSeederFactory(Boards, (faker) => {
  const boards = new Boards();

  // boards.id = faker.number.int({ min: 1 });
  // boards.title = fakerKO.string.alpha({ length: { min: 40, max: 40 } });
  // boards.content = fakerKO.string.alpha({ length: { min: 2000, max: 2000 } });
  // boards.writer = fakerKO.word.verb({ length: { min: 10, max: 10 } });
  // boards.password = fakerKO.string.alpha({ length: 16 });
  return boards;
});
