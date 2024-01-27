import { format } from 'date-fns';
import { DateFormat } from '../enum/dateformat.enum';

export const transformUnixTime = function (unixTime: number) {
  const date = new Date(unixTime * 1000); // 초 단위를 밀리초로 변환
  return format(date, DateFormat.YEAR_MONTH_DAY_HOUR_MINUTE_SECOND_FORMAT);
};
