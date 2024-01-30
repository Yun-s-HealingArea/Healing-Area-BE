import { PartialType } from '@nestjs/mapped-types';
import { ImageUploadDTO } from './image-upload.dto';

export class UpdateUploadDTO extends PartialType(ImageUploadDTO) {}
