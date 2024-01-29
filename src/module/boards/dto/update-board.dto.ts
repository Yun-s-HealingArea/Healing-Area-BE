import { PickType } from '@nestjs/mapped-types';
import { CreateBoardDTO } from './create-board.dto';

export class UpdateBoardDTO extends PickType(CreateBoardDTO, [
  'title',
  'description',
]) {}
