'use client';
import { useSearchParams } from 'next/navigation';

import { Comment } from '@/src/feature/comment/ui/comment';
import { replyDelete } from '@/src/feature/reply/api/reply-delete';
import { useReplyFetch } from '@/src/feature/reply/api/reply-fetch';

export function ReplyList() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const parentCommentId = searchParams.get('parentCommentId');
  const { data, targetRef, isLoading } = useReplyFetch(
    postId || '',
    parentCommentId || ''
  );
  const onDelete = (
    postId: string,
    parentCommentId: string,
    replyId: string
  ) => {
    replyDelete(postId, parentCommentId, replyId);
  };
  return (
    <div>
      {data.map(
        (
          {
            id,
            author,
            content,
            createdAt,
            updatedAt,
            parentCommentId,
            postId,
          },
          index
        ) => (
          <>
            <Comment
              key={id}
              author={author}
              content={content}
              createdAt={createdAt}
              updatedAt={updatedAt}
              onDelete={() => onDelete(postId, parentCommentId, id)}
            />
            {index === data.length - 1 && <div ref={targetRef} />}
          </>
        )
      )}
      {isLoading ? <p>Loading...</p> : <div ref={targetRef} />}
    </div>
  );
}
