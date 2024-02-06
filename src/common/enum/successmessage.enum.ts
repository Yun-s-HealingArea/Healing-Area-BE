import { CommonSuccessMessage } from './common.success.message.enum';

export enum SuccessMessage {
  USER_CREATED = `User ${CommonSuccessMessage.CREATED}`,
  USER_LOGIN = `User ${CommonSuccessMessage.LOGIN}`,
  USER_LOGOUT = `User ${CommonSuccessMessage.LOGOUT}`,
  USER_UPDATED = `User ${CommonSuccessMessage.UPDATED}`,
  USER_DELETED = `User ${CommonSuccessMessage.DELETED}`,
  USER_RESTORED = `User ${CommonSuccessMessage.RESTORED}`,
  REFRESH_TOKEN_GENERATED = `Refresh token ${CommonSuccessMessage.GENERATED}`,
  REFRESH_TOKEN_UPDATED = `Refresh token ${CommonSuccessMessage.UPDATED}`,
  BOARD_CREATED = `Board ${CommonSuccessMessage.CREATED}`,
  BOARD_UPDATED = `Board ${CommonSuccessMessage.UPDATED}`,
  BOARD_DELETED = `Board ${CommonSuccessMessage.DELETED}`,
  BOARD_RESTORED = `Board ${CommonSuccessMessage.RESTORED}`,
  BOARD_VIEWS_UPDATED = `Board Views ${CommonSuccessMessage.UPDATED}`,
  COMMENT_CREATED = `Comment ${CommonSuccessMessage.CREATED}`,
  COMMENT_UPDATED = `Comment ${CommonSuccessMessage.UPDATED}`,
  COMMENT_DELETED = `Comment ${CommonSuccessMessage.DELETED}`,
  COMMENT_RESTORED = `Comment ${CommonSuccessMessage.RESTORED}`,
  LIKE_CREATED = `Like ${CommonSuccessMessage.CREATED}`,
  LIKE_DELETED = `Like ${CommonSuccessMessage.DELETED}`,
  LIKE_RESTORED = `Like ${CommonSuccessMessage.RESTORED}`,
}
