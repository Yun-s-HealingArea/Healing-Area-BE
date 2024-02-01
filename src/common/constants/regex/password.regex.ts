/*
PASSWORD_REGEX는 영문+숫자+특수기호 16자 이하의 문자열만을 허용합니다.
 */
export const PASSWORD_REGEX =
  /^.*(?=^.{1,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
