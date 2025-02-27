'use clients';
import { useCallback, useState } from 'react';

import type { CommentType } from '@/src/feature/comment/types/comment-type';
import { getReply } from '@/src/feature/reply/api/reply-api';
import { useInfiniteScroll } from '@/src/shared/ui/useInfiniteScroll';

export function useReplyFetch() {
  const [data, setData] = useState<CommentType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReplies = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getReply(
        '17358013402371',
        '1738039148628',
        nextCursor,
        10
      );
      setData((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error('뭐가 문젠지 봐봐', error);
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, hasMore, isLoading]);

  const { targetRef } = useInfiniteScroll(fetchReplies);

  return { data, targetRef };
}
