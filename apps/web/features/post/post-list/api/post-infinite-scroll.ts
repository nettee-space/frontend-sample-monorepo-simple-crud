import { GetPostsCursor } from '@/entities/post';
import { httpClient } from '@/shared/api';

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
