'use client';
import { useCallback, useEffect, useState } from 'react';

import type { CommentType } from '@/src/feature/comment/types/comment-type';
import { Comment } from '@/src/feature/comment/ui/comment';
import { getReply } from '@/src/feature/reply/api/reply-api';
export function ReplyList() {
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
      console.log('Fetched Data:', response);
      setData((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setNextCursor(response.nextCursor);
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, hasMore, isLoading]);
  useEffect(() => {
    fetchReplies();
  }, [fetchReplies]);

  return (
    <div>
      {data.map(({ id, author, content }) => (
        <Comment key={id} author={author} content={content} />
      ))}
    </div>
  );
}
