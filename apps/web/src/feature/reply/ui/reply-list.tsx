'use client';
import { Comment } from '@/src/feature/comment/ui/comment';
import { useReplyFetch } from '@/src/feature/reply/api/reply-fetch';

export function ReplyList() {
  const { data, targetRef, isLoading } = useReplyFetch();
  return (
    <div>
      {data.map(({ id, author, content, createdAt, updatedAt }) => (
        <Comment
          key={id}
          author={author}
          content={content}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      ))}
      {isLoading ? <p>Loading...</p> : <div ref={targetRef} />}
    </div>
  );
}
