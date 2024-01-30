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
import { v4 as uuid } from 'uuid';
import { Boards } from './entities/boards.entity';
import { UsersService } from '../users/users.service';
import { UsersInfoDTO } from '../users/dto/users-info.dto';
import { UploadService } from '../upload/upload.service';
import { BoardsStatus } from './enum/status.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoardsService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}
  async create(createBoardDTO: CreateBoardDTO, token: UsersInfoDTO) {
    const users = await this.usersService.findOneByEmail(token.userEmail);
    const createdBoards = this.boardsRepository.create({
      title: createBoardDTO.title,
      description: createBoardDTO.description,
      users,
    });
    await this.boardsRepository.save(createdBoards);
    return generateMessageObject(SuccessMessage.BOARD_CREATED);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Boards>> {
    // TODO: Query 레벨에서 원하는 값을 가져오는 방법을 찾아보자.
    // const queryBuilder = this.boardsRepository
    //   .createQueryBuilder('boards')
    //   .select(
    //     'boards.id, boards.createdAt, boards.deletedAt, boards.title, SUBSTRING(boards.description, 1, 5) as description,  boards.isPrivate, boards.imageLink',
    //   )
    //   .getMany();
    // console.log(queryBuilder.then((res) => console.log(res)));
    const boards = await paginate(this.boardsRepository, options, {
      order: { createdAt: 'ASC' },
    });
    for (const board of boards.items) {
      board.imageFileName = await this.uploadService.getPresignedURL(
        this.configService.get('AWS_S3_BUCKET_BOARDS_RESOURCE_FOLDER_NAME'),
        board.imageFileName,
      );
    }
    //이미지 업로드가 null이면 패스, 아니면 peekImageURL을 통해 이미지 URL을 가져온다.
    return boards;
  }

  async findOne(id: number) {
    // NotFoundException
    const board = await this.boardsRepository.findOne({ where: { id } });
    // console.log(board.imageFileName);
    board &&
      (board.imageFileName = await this.uploadService.getPresignedURL(
        this.configService.get('AWS_S3_BUCKET_BOARDS_RESOURCE_FOLDER_NAME'),
        board.imageFileName,
      ));
    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDTO) {
    await this.boardsRepository.update(id, updateBoardDto);
    return generateMessageObject(SuccessMessage.BOARD_UPDATED);
  }

  async remove(id: number) {
    await this.boardsRepository.softDelete(id);
    return generateMessageObject(SuccessMessage.BOARD_DELETED);
  }

  async restore(id: number) {
    await this.boardsRepository.restore(id);
    return generateMessageObject(SuccessMessage.BOARD_RESTORED);
  }

  async oneBoardsGetComments(id: number) {
    return this.boardsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async allBoardsGetComments(options: IPaginationOptions) {
    return paginate(this.boardsRepository, options, {
      relations: ['comments'],
    });
  }

  async imageUpload(file: Express.Multer.File) {
    const imageName = uuid();
    const ext = file.originalname.split('.').pop();
    const imageUrl = await this.uploadService.imageUploadToS3(
      'boards/',
      `${imageName}.${ext}`,
      file,
      ext,
    );
    // const presignedURL = await this.uploadService.getPresignedURL(
    //   imageUrl.split('/').pop(),
    // );
    // console.log(presignedURL);
    // console.log('미리 서명된 URL', presignedURL);
    // console.log('이미지 URL', imageUrl.split('/').pop());
    return imageUrl.split('/').pop();
  }

  async imageURLToDB(id: number, imageFileName: string) {
    await this.boardsRepository.update(id, {
      imageFileName,
      boardStatus: BoardsStatus.DONE,
    });
    return generateMessageObject(SuccessMessage.BOARD_UPDATED);
  }
}
