import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ImageUploadDTO } from '../upload/dto/image-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryParameterDTO } from '../../common/dto/query.parameter.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDTO,
    @UserDataFromJWT() users: UsersInfoDTO,
  ) {
    return this.boardsService.create(createBoardDto, users);
  }

  @Get()
  async findAll(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.boardsService.findAll({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
    });
  }

  @Get('/comments')
  async allBoardsGetComments(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.boardsService.allBoardsGetComments({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
    });
  }

  @Get(':boardsId/comments')
  async getOneBoardsComments(@Param('boardsId') id: QueryParameterDTO) {
    return this.boardsService.oneBoardsGetComments(+id);
  }

  @Get(':boardsId')
  async findOne(@Param('boardsId') id: QueryParameterDTO) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':boardsId')
  async update(
    @Param('boardsId') id: QueryParameterDTO,
    @Body() updateBoardDto: UpdateBoardDTO,
  ) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':boardsId')
  async remove(@Param('boardsId') id: QueryParameterDTO) {
    return this.boardsService.remove(+id);
  }

  @Post(':boardsId/restore')
  async restore(@Param('boardsId') id: QueryParameterDTO) {
    return this.boardsService.restore(+id);
  }

  @ApiOperation({ summary: '그림 완성시 그림 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 파일',
    type: ImageUploadDTO,
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @Post(':boardsId/image')
  async saveImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('boardsId') id: QueryParameterDTO,
  ) {
    const imageFileName = await this.boardsService.imageUpload(file);
    return this.boardsService.imageURLToDB(+id, imageFileName);
  }
  //
  // @Get(':boardsId/image/presigned_url'))
  // async getPresignedURL(@Param('boardsId') id: string) {
  //   return this.boardsService.getPresignedURL(+id);
  // }
}
