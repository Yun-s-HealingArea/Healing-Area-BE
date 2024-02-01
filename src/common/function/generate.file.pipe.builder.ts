import { BadRequestException, ParseFilePipeBuilder } from '@nestjs/common';
import { ErrorMessage } from '../enum/errormessage.enum';

export function generateFilePipeBuilder() {
  return new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'png',
    })
    .addFileTypeValidator({
      fileType: 'jpeg',
    })
    .addMaxSizeValidator({
      maxSize: 10 * 1024 * 1024, // just to you know it's possible.
    })
    .build({
      exceptionFactory() {
        throw new BadRequestException([
          ErrorMessage.FILE_TO_LARGE,
          ErrorMessage.INVALID_FILE_TYPE,
        ]);
      },
    });
}
