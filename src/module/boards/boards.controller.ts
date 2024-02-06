import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { PaginateDTO } from '../../common/dto/paginate.dto';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';
import { UserDataFromJWT } from '../../common/decorator/user.data.from.jwt.decorator';
import { UsersInfoDTO } from '../users/dto/users-info.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ImageUploadDTO } from '../upload/dto/image-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryParameterDTO } from '../../common/dto/query.parameter.dto';
import { generateItemsObject } from '../../common/function/generate.items.object';
import { Boards } from './entities/boards.entity';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { ConfigService } from '@nestjs/config';
import { generateFilePipeBuilder } from '../../common/function/generate.file.pipe.builder';

@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly configService: ConfigService,
  ) {}
  @Get('comments')
  @ApiOperation({
    summary: '모든 게시글 & 댓글 조회',
    description: '모든 게시글과 게시글에 달린 댓글을 조회한다. ',
  })
  async allBoardsGetComments(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.boardsService.allBoardsGetComments({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
      route: this.configService.get('HEALING_AREA_URL') + 'boards/comments',
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시글 단일 조회',
    description: 'param으로 들어온 id에 해당하는 게시글을 조회한다. ',
  })
  async findOne(
    @Param() params: QueryParameterDTO,
  ): Promise<{ items: Boards }> {
    console.log(typeof params.id);
    console.log(params);
    return generateItemsObject(
      await this.boardsService.findOneWithFileURL(+params.id),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiOperation({
    summary: '게시글 작성',
    description: '게시글을 작성한다.',
  })
  @ApiCreatedResponse({
    description: `${SuccessMessage.BOARD_CREATED}`,
  })
  @ApiUnauthorizedResponse({ description: `${ErrorMessage.UNAUTHORIZED}` })
  @ApiBearerAuth('Authorization')
  async create(
    @Body() createBoardDto: CreateBoardDTO,
    @UserDataFromJWT() users: UsersInfoDTO,
  ) {
    return this.boardsService.create(createBoardDto, users);
  }

  @Post(':id/views')
  @ApiOperation({
    summary: '게시글 조회수 증가',
    description:
      'param으로 들어온 id에 해당하는 게시글의 조회수를 증가시킨다. ',
  })
  // @UseInterceptors(TransactionInterceptor)
  async views(@Param() params: QueryParameterDTO) {
    return this.boardsService.increaseViewsAddQueue(+params.id);
  }

  @Get()
  @ApiOperation({
    summary: '게시글 전체 조회',
    description: '게시글 전체를 조회한다. ',
  })
  async findAll(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.boardsService.findAll({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
      route:
        this.configService.get('HEALING_AREA_URL') +
        this.configService.get('AWS_S3_BUCKET_BOARDS_RESOURCE_FOLDER_NAME'),
    });
  }

  @Get(':id/comments')
  @ApiOperation({
    summary: '게시글의 댓글 조회',
    description: 'param으로 들어온 id에 해당하는 게시글과 댓글을 조회한다. ',
  })
  async getOneBoardsComments(@Param() params: QueryParameterDTO) {
    return generateItemsObject(
      await this.boardsService.oneBoardsGetComments(+params.id),
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정',
    description: 'param으로 들어온 id에 해당하는 게시글을 수정한다. ',
  })
  @ApiUnauthorizedResponse({ description: `${ErrorMessage.UNAUTHORIZED}` })
  @ApiBearerAuth('Authorization')
  async update(
    @Param() params: QueryParameterDTO,
    @Body() updateBoardDto: UpdateBoardDTO,
  ) {
    return this.boardsService.update(+params.id, updateBoardDto);
  }

  @Delete(':id')
  @ApiBearerAuth('Authorization')
  async remove(@Param() params: QueryParameterDTO) {
    return this.boardsService.remove(+params.id);
  }

  @Post(':id/restore')
  @ApiOperation({
    summary: '게시글 복구',
    description: 'param으로 들어온 id에 해당하는 게시글을 복구한다. ',
  })
  @ApiBearerAuth('Authorization')
  async restore(@Param() params: QueryParameterDTO) {
    return this.boardsService.restore(+params.id);
  }

  @ApiOperation({ summary: '작가 그림 완성시 그림 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 파일',
    type: ImageUploadDTO,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth('Authorization')
  @Post(':id/image')
  async saveImage(
    //TODO: 추후 Guard로 파일 사이즈 쳐내야 함. Guard는 리퀘스트 가장 첫 번째 단계에서 실행되기 때문.
    @UploadedFile(generateFilePipeBuilder())
    file: Express.Multer.File,
    @Param() params: QueryParameterDTO,
  ) {
    const imageFileName = await this.boardsService.imageUpload(file);
    return this.boardsService.imageURLToDB(+params.id, imageFileName);
  }

  //
  // @Get(':boardsId/image/presigned_url'))
  // async getPresignedURL(@Param('boardsId') id: string) {
  //   return this.boardsService.getPresignedURL(+id);
  // }
}
