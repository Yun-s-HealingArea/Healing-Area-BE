import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ErrorMessage } from '../../common/enum/errormessage.enum';
import * as bcrypt from 'bcrypt';
import { SuccessMessage } from '../../common/enum/successmessage.enum';
import { UsersRepository } from './users.repository';
import { generateMessageObject } from '../../common/function/generate.message.object.function';
import { LoginDTO } from '../auth/dto/login.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  async create(createUserDTO: CreateUserDTO) {
    const user = await this.userRepository.count({
      where: { email: createUserDTO.email },
    });
    if (user) throw new BadRequestException([ErrorMessage.USER_ALREADY_EXIST]);
    const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
    const { email, name, birthday, phoneNumber } = createUserDTO;
    const createdUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      birthday,
      phoneNumber,
    });
    await this.userRepository.save(createdUser);
    return generateMessageObject(SuccessMessage.USER_CREATED);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Users>> {
    return paginate(this.userRepository, options);
  }

  async findOne(userId: number) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneAndReturnRefreshToken(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['refreshToken'],
    });
  }

  async update(userId: number, updateUserDTO: UpdateUserDTO) {
    return this.userRepository.update(userId, updateUserDTO);
  }
  //TODO: 회원 탈퇴
  async remove(userId: number) {
    return this.userRepository.softDelete(userId);
  }

  async restore(userId: number) {
    return this.userRepository.restore(userId);
  }

  async isUserExist(email: string) {
    return this.userRepository.exist({ where: { email } });
  }

  async comparePassword(loginDTO: LoginDTO) {
    const userData = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: loginDTO.email })
      .addSelect('user.password')
      .select('user.password')
      .getOne();
    return await bcrypt.compare(loginDTO.password, userData.password);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.userRepository.update(userId, { refreshToken });
    return generateMessageObject(SuccessMessage.REFRESH_TOKEN_UPDATED);
  }
}
