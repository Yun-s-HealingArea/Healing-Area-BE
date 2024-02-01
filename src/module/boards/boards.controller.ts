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
import { generateItemsObject } from '../../common/function/generate.items.object';
import { Boards } from './entities/boards.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get('comments')
  async allBoardsGetComments(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.boardsService.allBoardsGetComments({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
    });
  }

  @Get(':id')
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

  @Get(':id/comments')
  async getOneBoardsComments(@Param() params: QueryParameterDTO) {
    return this.boardsService.oneBoardsGetComments(+params.id);
  }

  @Patch(':id')
  async update(
    @Param() params: QueryParameterDTO,
    @Body() updateBoardDto: UpdateBoardDTO,
  ) {
    return this.boardsService.update(+params.id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param() params: QueryParameterDTO) {
    return this.boardsService.remove(+params.id);
  }

  @Post(':id/restore')
  async restore(@Param() params: QueryParameterDTO) {
    return this.boardsService.restore(+params.id);
  }

  @ApiOperation({ summary: '그림 완성시 그림 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '업로드할 파일',
    type: ImageUploadDTO,
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  @Post(':id/image')
  async saveImage(
    @UploadedFile() file: Express.Multer.File,
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
