import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';
import { PaginateDTO } from '../../common/dto/paginate.dto';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';
import { UserDataFromJWT } from '../../common/decorator/user.data.from.jwt.decorator';
import { UsersInfoDTO } from '../users/dto/users-info.dto';

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
  async getOneBoardsComments(@Param('boardsId') id: string) {
    return this.boardsService.oneBoardsGetComments(+id);
  }

  @Get(':boardsId')
  async findOne(@Param('boardsId') id: string) {
    return this.boardsService.findOne(+id);
  }

  @Patch(':boardsId')
  async update(
    @Param('boardsId') id: string,
    @Body() updateBoardDto: UpdateBoardDTO,
  ) {
    return this.boardsService.update(+id, updateBoardDto);
  }

  @Delete(':boardsId')
  async remove(@Param('boardsId') id: string) {
    return this.boardsService.remove(+id);
  }

  @Post(':boardsId/restore')
  async restore(@Param('boardsId') id: string) {
    return this.boardsService.restore(+id);
  }
}
