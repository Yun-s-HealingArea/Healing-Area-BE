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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { ConfigService } from '@nestjs/config';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '댓글 작성',
    description: '댓글을 작성한다.',
  })
  @ApiCreatedResponse({
    description: `${SuccessMessage.COMMENT_CREATED}`,
  })
  @ApiUnauthorizedResponse({ description: `${ErrorMessage.UNAUTHORIZED}` })
  @ApiBody({ type: CreateCommentDTO })
  async create(@Body() createCommentDto: CreateCommentDTO) {
    return this.commentsService.create(createCommentDto);
  }
  @Patch(':id')
  @ApiOperation({
    summary: '댓글 수정',
    description: 'param으로 들어온 id에 해당하는 댓글을 수정한다.',
  })
  async update(
    @Param() params: QueryParameterDTO,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ) {
    return this.commentsService.update(+params.id, updateCommentDTO);
  }

  @Get()
  @ApiOperation({
    summary: '댓글 전체 조회',
    description: '댓글 전체를 조회한다.',
  })
  @ApiOkResponse({
    description: `items/links/meta 객체 반환`,
  })
  async findAll(@Query() paginateDTO: PaginateDTO) {
    return this.commentsService.findAll({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
      route: this.configService.get('HEALING_AREA_URL') + '/comments',
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: '댓글 상세 조회',
    description: 'param으로 들어온 id에 해당하는 댓글을 조회한다.',
  })
  @ApiOkResponse({
    description: `items 객체 반환`,
  })
  async findOne(@Param() params: QueryParameterDTO) {
    return this.commentsService.findOne(+params.id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '댓글 삭제',
    description: 'param으로 들어온 id에 해당하는 댓글을 삭제한다.',
  })
  @ApiOkResponse({
    description: `${SuccessMessage.COMMENT_DELETED}`,
  })
  async remove(@Param() params: QueryParameterDTO) {
    return this.commentsService.remove(+params.id);
  }

  @Post(':id/restore')
  @ApiOperation({
    summary: '댓글 복구',
    description: 'param으로 들어온 id에 해당하는 댓글을 복구한다.',
  })
  @ApiOkResponse({
    description: `${SuccessMessage.COMMENT_RESTORED}`,
  })
  async restore(@Param() params: QueryParameterDTO) {
    return this.commentsService.restore(+params.id);
  }
}
