/*
  Controller Layer에서 단일 조회시 일관성을 위해 items 객체로 감싸주는 함수
 */

export async function generateItemsObject<T>(
  queryResult: T,
): Promise<{ items: T }> {
  return {
    items: queryResult,
  };
}
