'use client';
import { Comment } from '@/src/feature/comment/ui/comment';
import { useReplyFetch } from '@/src/feature/reply/api/reply-fetch';

export function ReplyList() {
  const { data, targetRef } = useReplyFetch();
  return (
    <div>
      {data.map(({ id, author, content }) => (
        <Comment key={id} author={author} content={content} />
      ))}
      <div ref={targetRef} />
    </div>
  );
}
