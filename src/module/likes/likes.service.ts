import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDTO } from './dto/create-like.dto';
import { LikesRepository } from './likes.repository';
import { UsersService } from '../users/users.service';
import { BoardsService } from '../boards/boards.service';
import { UpdateLikeDTO } from './dto/update-like.dto';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { generateMessageObject } from '../../common/function/generate.message.object.function';
import { SuccessMessage } from '../../common/enum/successmessage.enum';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
  ) {}
  async create(createLikeDTO: CreateLikeDTO) {
    // const users = await this.usersService.findOne(createLikeDTO.usersId);
    const users = await this.usersService.findOneByEmail(
      createLikeDTO.usersEmail,
    );
    const boards = await this.boardsService.findOne(createLikeDTO.boardsId);
    const isUserAlreadyLiked = await this.likesRepository.exist({
      where: {
        users: { id: users.id },
        boards: { id: boards.id },
      },
    });
    //TODO: TypeScript에서는 throw 문이 표현식이 아니기 때문에 삼항 연산자의 일부로 직접 사용할 수 없음
    // if문인데 좀 더 깔끔하게 분기할 수 있는 방법이 없을까? (if.. 극..혐..)
    if (isUserAlreadyLiked) {
      throw new BadRequestException([ErrorMessage.LIKE_ALREADY_EXIST]);
    } else {
      const createdLikes = this.likesRepository.create({
        users,
        boards,
      });
      await this.likesRepository.save(createdLikes);
    }

    return generateMessageObject(SuccessMessage.LIKE_CREATED);
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
