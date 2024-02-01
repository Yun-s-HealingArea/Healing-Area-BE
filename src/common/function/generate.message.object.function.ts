/*
  Service Layer에서 사용하는 메세지를 반환해주는 함수
  TODO: 추후 resource가 소모되는걸 방지하고자 성공여부만 interceptor에서 반환 예정
 */
export async function generateMessageObject(message: string) {
  return {
    message,
  };
}
