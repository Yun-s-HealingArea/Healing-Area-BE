import { Injectable } from '@nestjs/common';
import { CreateImageUploadDto } from './dto/create-image-upload.dto';
import { UpdateImageUploadDto } from './dto/update-image-upload.dto';

@Injectable()
export class ImageUploadService {
  create(createImageUploadDto: CreateImageUploadDto) {
    return 'This action adds a new imageUpload';
  }

  findAll() {
    return `This action returns all imageUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageUpload`;
  }

  update(id: number, updateImageUploadDto: UpdateImageUploadDto) {
    return `This action updates a #${id} imageUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageUpload`;
  }
}
