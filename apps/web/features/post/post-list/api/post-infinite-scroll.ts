import { BASE_URL } from '@/shared/api/http-client';
import { GetPostsCursor } from '@/shared/types/post-types';

const commonHeaders = new Headers();
commonHeaders.append('Content-Type', 'application/json');

export async function getInfiniteScrollData(
  cursor?: string,
  limit?: number
): Promise<GetPostsCursor> {
  const followingURL = `/posts/infinite?${new URLSearchParams({
    ...(cursor && { cursor }), // cursor가 있으면 추가, undefined or null이면 추가 안 함
    ...(limit && { limit: limit.toString() }), // limit가 있으면 추가
  })}`;

  const response = await fetch(`${BASE_URL}${followingURL}`, {
    method: 'GET',
    headers: commonHeaders,
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}
