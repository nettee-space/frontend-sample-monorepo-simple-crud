'use client';
import { useCallback, useState } from 'react';

import { getReply } from '@/src/feature/reply/api/reply-api';

import { ReplyType } from '../types/Reply';

interface ReplyProps {
  postId: string;
  commentId: string;
}

export function useReplyFetch({ postId, commentId }: ReplyProps) {
  const [data, setData] = useState<ReplyType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReplies = useCallback(async () => {
    if (!hasMore || isLoading) return; // 이미 로딩 중이면 실행 안 함

    setIsLoading(true);
    try {
      const response = await getReply(postId, commentId, nextCursor, 10);
      setData((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error('댓글을 불러오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  }, [postId, commentId, nextCursor, hasMore, isLoading]);

  return { data, fetchReplies, hasMore, isLoading };
}
