import { Injectable } from '@nestjs/common';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentsRepository } from './comments.repository';
import { BoardsService } from '../boards/boards.service';
import { generateMessageObject } from '../../common/function/generate.message.object.function';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly boardsService: BoardsService,
  ) {}
  async create(createCommentDTO: CreateCommentDTO) {
    const boards = await this.boardsService.findOne(createCommentDTO.boardsId);
    console.log(boards);
    const createdComments = this.commentsRepository.create({
      description: createCommentDTO.description,
      boards,
    });
    await this.commentsRepository.save(createdComments);
    return generateMessageObject(SuccessMessage.COMMENT_CREATED);
  }

  findAll(options: IPaginationOptions) {
    return paginate(this.commentsRepository, options, {});
  }

  async findOne(id: number) {
    return this.commentsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCommentDTO: UpdateCommentDTO) {
    const boards = await this.boardsService.findOne(updateCommentDTO.boardsId);
    await this.commentsRepository.update(id, {
      description: updateCommentDTO.description,
      boards,
    });
    return generateMessageObject(SuccessMessage.COMMENT_UPDATED);
  }

  async remove(id: number) {
    await this.commentsRepository.softDelete(id);
    return generateMessageObject(SuccessMessage.COMMENT_DELETED);
  }

  async restore(id: number) {
    await this.commentsRepository.restore(id);
    return generateMessageObject(SuccessMessage.COMMENT_RESTORED);
  }
}
