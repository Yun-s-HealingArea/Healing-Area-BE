import { Injectable } from '@nestjs/common';
import { CreateLikeDTO } from './dto/create-like.dto';
import { LikesRepository } from './likes.repository';
import { UsersService } from '../users/users.service';
import { BoardsService } from '../boards/boards.service';
import { UpdateLikeDTO } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
  ) {}
  async create(createLikeDTO: CreateLikeDTO) {
    console.log(createLikeDTO);
    const users = await this.usersService.findOne(createLikeDTO.usersId);
    const boards = await this.boardsService.findOne(createLikeDTO.boardsId);
    console.log(users, boards);

    const createdLikes = this.likesRepository.create({
      users,
      boards,
    });
    await this.likesRepository.save(createdLikes);
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDTO: UpdateLikeDTO) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
