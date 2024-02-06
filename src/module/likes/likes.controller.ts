import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDTO } from './dto/create-like.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';
import { TransactionInterceptor } from '../../common/interceptor/transaction.interceptor';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    summary: '좋아요 생성',
    description: '좋아요를 생성한다. 좋아요는 단 한번만 누를 수 있다.',
  })
  @ApiBadRequestResponse({ description: `${ErrorMessage.LIKE_ALREADY_EXIST}` })
  @ApiCreatedResponse({ description: `${SuccessMessage.LIKE_CREATED}` })
  async create(@Body() createLikeDTO: CreateLikeDTO) {
    return this.likesService.create(createLikeDTO);
  }
}
