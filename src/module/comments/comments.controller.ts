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
import { QueryParameterDTO } from '../../common/dto/query.parameter.dto';

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

  @Get(':id')
  async findOne(@Param() params: QueryParameterDTO) {
    return this.commentsService.findOne(+params.id);
  }

  @Patch(':id')
  async update(
    @Param() params: QueryParameterDTO,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentsService.update(+params.id, updateCommentDTO);
  }

  @Delete(':id')
  async remove(@Param() params: QueryParameterDTO) {
    return this.commentsService.remove(+params.id);
  }

  @Post(':id/restore')
  async restore(@Param() params: QueryParameterDTO) {
    return this.commentsService.restore(+params.id);
  }
}
