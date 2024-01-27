import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  create(createBoardDto: CreateBoardDTO) {
    return 'This action adds a new board';
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDTO) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
