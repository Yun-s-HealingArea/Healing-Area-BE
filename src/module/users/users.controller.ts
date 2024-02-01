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
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginateDTO } from '../../common/dto/paginate.dto';
import { QueryParameterDTO } from '../../common/dto/query.parameter.dto';
import { generateItemsObject } from '../../common/function/generate.items.object';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  //TODO: nestjs-typeorm-paginate 적용
  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get()
  @ApiOperation({
    summary: '모든 유저 조회',
    description: '모든 조회 가능한 유저를 조회한다.',
  })
  async findAll(@Query() paginateDTO: PaginateDTO) {
    paginateDTO.limit = paginateDTO.limit > 100 ? 100 : paginateDTO.limit;
    return this.userService.findAll({
      page: paginateDTO.page,
      limit: paginateDTO.limit,
      route:
        this.configService.get('HEALING_AREA_URL') +
        this.configService.get('AWS_S3_BUCKET_USERS_RESOURCE_FOLDER_NAME'),
    });
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Get(':id')
  @ApiOperation({
    summary: '유저 단일 조회',
    description: 'param으로 들어온 userId에 해당하는 유저를 조회한다.',
  })
  async findOne(@Param() params: QueryParameterDTO) {
    return generateItemsObject(await this.userService.findOne(+params.id));
  }

  @Post('register')
  @ApiOperation({
    summary: '회원 가입',
    description:
      '회원 가입을 수행한다. 비밀번호는 영문+숫자+특수기호 16자 이하의 문자열이며 각각 1개 이상 포함되어야 한다.',
  })
  async register(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Post(':id/restore')
  @ApiOperation({
    summary: '유저 정보 복구',
    description: 'param으로 들어온 userId에 해당하는 유저의 정보를 복구한다',
  })
  async restore(@Param() params: QueryParameterDTO) {
    return this.userService.restore(+params.id);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Delete(':id')
  @ApiOperation({
    summary: '유저 정보 삭제 (회원 탈퇴)',
    description:
      'param으로 들어온 userId에 해당하는 유저의 정보를 논리 삭제(soft delete) 한다. (미구현)',
  })
  async remove(@Param() params: QueryParameterDTO) {
    return this.userService.remove(+params.id);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth('Authorization')
  @Patch(':id')
  @ApiOperation({
    summary: '유저 정보 수정',
    description: 'param으로 들어온 userId에 해당하는 유저의 정보를 수정한다.',
  })
  async update(
    @Param() params: QueryParameterDTO,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return this.userService.update(+params.id, updateUserDto);
  }
}
