import { httpClient } from '@/shared/api/http-client';
import { GetPostsCursor } from '@/shared/types/post-types';

export async function getInfiniteScrollData(
  cursor?: string,
  limit?: number
): Promise<GetPostsCursor> {
  return httpClient<GetPostsCursor>('/posts/infinite', {
    method: 'GET',
    queryParams: {
      cursor,
      limit,
    },
  });
}
