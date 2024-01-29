import { Body, Controller, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDTO } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  @Post()
  async create(@Body() createLikeDTO: CreateLikeDTO) {
    return this.likesService.create(createLikeDTO);
  }
}
