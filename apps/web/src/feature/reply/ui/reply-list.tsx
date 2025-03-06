'use client';
import { useSearchParams } from 'next/navigation';

import { Comment } from '@/src/feature/comment/ui/comment';
import { useReplyFetch } from '@/src/feature/reply/api/reply-fetch';

export function ReplyList() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const parentCommentId = searchParams.get('parentCommentId');
  const { data, targetRef, isLoading } = useReplyFetch(
    postId || '',
    parentCommentId || ''
  );
  return (
    <div>
      {data.map(({ id, author, content, createdAt, updatedAt }, index) => (
        <>
          <Comment
            key={id}
            author={author}
            content={content}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
          {index === data.length - 1 && <div ref={targetRef} />}
        </>
      ))}
      {isLoading ? <p>Loading...</p> : <span ref={targetRef} />}
    </div>
  );
}
