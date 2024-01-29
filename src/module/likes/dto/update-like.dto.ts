import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDTO } from './create-like.dto';

export class UpdateLikeDTO extends PartialType(CreateLikeDTO) {}
