import { CommonErrorMessage } from './common.error.message.enum';

/*
에러 메세지를 한곳에 모은 enum 파일입니다.

해당하는 에러 메세지의 이름을 정의하고
중복되는 메세지가 있을 경우 throw new XXXError(ErrorMessageEnum.${ERROR_STATUS}) 형태로 사용합니다.
 */

export enum ErrorMessage {
  USER_NOT_FOUND_OR_WRONG_PASSWORD = `User ${CommonErrorMessage.NOT_FOUND} or Password ${CommonErrorMessage.IS_WRONG} ${CommonErrorMessage.PLESASE_TRY_AGAIN}`,
  USER_NOT_FOUND = `User ${CommonErrorMessage.NOT_FOUND}`,
  USER_ALREADY_EXIST = `User ${CommonErrorMessage.ALREADY_EXIST}`,
  BOARD_NOT_FOUND = `Board ${CommonErrorMessage.NOT_FOUND}`,
  BOARD_ALREADY_EXIST = `Board ${CommonErrorMessage.ALREADY_EXIST}`,
  COMMENT_NOT_FOUND = `Comment ${CommonErrorMessage.NOT_FOUND}`,
  COMMENT_ALREADY_EXIST = `Comment ${CommonErrorMessage.ALREADY_EXIST}`,
  LIKE_ALREADY_EXIST = `Like ${CommonErrorMessage.ALREADY_EXIST}`,
  UNAUTHORIZED = `${CommonErrorMessage.UNAUTHORIZED}`,
  BAD_TOKEN = `${CommonErrorMessage.BAD_TOKEN}`,
  TOKEN_EXPIRED = `${CommonErrorMessage.TOKEN_EXPIRED}`,
}
