import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { PaginateDTO } from '../../common/dto/paginate.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  async findAll(@Query() paginateDTO: PaginateDTO) {
    return this.commentsService.findAll({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
    });
  }

  @Get(':commentsId')
  async findOne(@Param('commentsId') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':commentsId')
  async update(
    @Param('commentsId') id: string,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentsService.update(+id, updateCommentDTO);
  }

  @Delete(':commentsId')
  async remove(@Param('commentsId') id: string) {
    return this.commentsService.remove(+id);
  }

  @Post(':commentsId/restore')
  async restore(@Param('commentsId') id: string) {
    return this.commentsService.restore(+id);
  }
}
