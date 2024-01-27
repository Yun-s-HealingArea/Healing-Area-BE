import { CommonSuccessMessage } from './common.success.message.enum';

export enum SuccessMessage {
  USER_CREATED = `User ${CommonSuccessMessage.CREATED}`,
  USER_LOGIN = `User ${CommonSuccessMessage.LOGIN}`,
  USER_LOGOUT = `User ${CommonSuccessMessage.LOGOUT}`,
  REFRESH_TOKEN_GENERATED = `Refresh token ${CommonSuccessMessage.GENERATED}`,
  REFRESH_TOKEN_UPDATED = `Refresh token ${CommonSuccessMessage.UPDATED}`,
  BOARD_CREATED = `Board ${CommonSuccessMessage.CREATED}`,
  BOARD_UPDATED = `Board ${CommonSuccessMessage.UPDATED}`,
}
