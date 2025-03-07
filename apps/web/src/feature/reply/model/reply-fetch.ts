'use clients';
import { useCallback, useState } from 'react';

import { getReply } from '@/src/feature/reply/api/reply-api';
import type { ReplyType } from '@/src/feature/reply/types/Reply';
import { useInfiniteScroll } from '@/src/shared/lib';

export function useReplyFetch(postId: string, parentCommentId: string) {
  const [data, setData] = useState<ReplyType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReplies = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getReply(postId, parentCommentId, nextCursor, 10);
      setData((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, hasMore, isLoading, postId, parentCommentId]);

  const { targetRef } = useInfiniteScroll(fetchReplies, { threshold: 1 });

  return { data, targetRef, isLoading };
}
