import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guard/local.auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(LocalAuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  //TODO: nestjs-typeorm-paginate 적용

  @Get()
  @ApiOperation({
    summary: '모든 유저 조회',
    description: '모든 조회 가능한 유저를 조회한다.',
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiOperation({
    summary: '단일 유저 조회',
    description: 'param으로 들어온 userId에 해당하는 유저를 조회한다.',
  })
  async findOne(@Param('userId') userId: string) {
    return this.userService.findOne(+userId);
  }

  @Patch(':userId')
  @ApiOperation({
    summary: '유저 정보 수정',
    description: 'param으로 들어온 userId에 해당하는 유저의 정보를 수정한다.',
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    console.log(updateUserDto);
    return this.userService.update(+userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({
    summary: '유저 정보 삭제 (회원 탈퇴)',
    description:
      'param으로 들어온 userId에 해당하는 유저의 정보를 논리 삭제(soft delete) 한다. (미구현)',
  })
  async remove(@Param('userId') userId: string) {
    return this.userService.remove(+userId);
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

  @Post('restore/:userId')
  async restore(@Param('userId') userId: string) {
    return this.userService.restore(+userId);
  }
}
