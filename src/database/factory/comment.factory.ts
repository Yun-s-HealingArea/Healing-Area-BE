import { setSeederFactory } from 'typeorm-extension';
import { Comments } from '../../module/comments/entities/comments.entity';

export default setSeederFactory(Comments, (faker) => {
  const comment = new Comments();

  // comment.content = fakerKO.string.alpha({ length: { min: 500, max: 500 } });
  // comment.writer = fakerKO.word.verb({ length: { min: 10, max: 10 } });
  // comment.password = fakerKO.string.alpha({ length: 16 });
  return comment;
});
