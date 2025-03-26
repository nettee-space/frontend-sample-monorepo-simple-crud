'use clients';
import { useCallback, useState } from 'react';

import { getReply } from '@/src/feature/reply/api/reply-api';
import type { ReplyType } from '@/src/feature/reply/types/reply-type';
import { useInfiniteScroll } from '@/src/shared/lib/useInfiniteScroll';

export function useReplyFetch() {
  const [data, setData] = useState<ReplyType[]>([]);
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
      throw new Error(error as string);
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, hasMore, isLoading]);

  const { targetRef } = useInfiniteScroll(fetchReplies, { threshold: 1 });

  return { data, targetRef, isLoading };
}
