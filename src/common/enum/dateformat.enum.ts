/*
 서버 내에서 쓰이는 모든 Datetime의 양식입니다.
 ISO 8601 표준을 따릅니다.
 */

export enum DateFormat {
  YEAR_MONTH_DAY_FORMAT = 'yyyy-MM-dd',
  YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT = 'yyyy-MM-dd HH:mm:ss',
}
