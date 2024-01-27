import { Injectable } from '@nestjs/common';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { BoardsRepository } from './boards.repository';
import { generateMessageObject } from '../../common/function/generate.message.object.function';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Boards } from './entities/boards.entity';
import { UsersService } from '../users/users.service';
import { UsersInfoDTO } from '../users/dto/users-info.dto';

@Injectable()
export class BoardsService {
  constructor(
    private boardsRepository: BoardsRepository,
    private usersService: UsersService,
  ) {}
  async create(createBoardDTO: CreateBoardDTO, token: UsersInfoDTO) {
    const users = await this.usersService.findOneByEmail(token.userEmail);
    console.log(users);
    const createdBoards = this.boardsRepository.create({
      title: createBoardDTO.title,
      description: createBoardDTO.description,
      users: users,
    });
    await this.boardsRepository.save(createdBoards);
    return generateMessageObject(SuccessMessage.BOARD_CREATED);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Boards>> {
    return paginate(this.boardsRepository, options);
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
