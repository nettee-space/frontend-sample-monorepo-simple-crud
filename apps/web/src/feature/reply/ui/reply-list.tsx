'use client';
import { useState } from 'react';

import { Comment } from '@/src/feature/comment/ui/comment';
import { useReplyFetch } from '@/src/feature/reply/api/reply-fetch';

interface ReplyProps {
  postId: string;
  commentId: string;
}

export function ReplyList({ postId, commentId }: ReplyProps) {
  const { data, fetchReplies, hasMore, isLoading } = useReplyFetch({
    postId,
    commentId,
  });
  const [isLoadedReply, setIsLoadedReply] = useState(false);

  const handleLoadMore = async () => {
    if (isLoading || (!isLoadedReply && isLoading)) return;
    await fetchReplies();
    setIsLoadedReply(true);
  };

  return (
    <div>
      {!isLoadedReply ? (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
        >
          {isLoading ? '불러오는 중...' : '답글 보기'}
        </button>
      ) : (
        <>
          {data.map(({ id, author, content, createdAt, updatedAt }) => (
            <Comment
              key={id}
              author={author}
              content={content}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          ))}

          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
            >
              {isLoading ? '불러오는 중...' : '답글 더보기'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
