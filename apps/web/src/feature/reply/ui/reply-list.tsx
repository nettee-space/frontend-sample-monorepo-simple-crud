'use client';
import { useState } from 'react';

import { Comment } from '@/src/feature/comment/ui/comment';
import { useReplyFetch } from '@/src/feature/reply/model/reply-fetch';

import { ReplyModifyForm } from './reply-modify-form';

export function ReplyList() {
  const { data, targetRef, isLoading } = useReplyFetch();
  const [editId, setEditId] = useState<string>('');

  const handleEdit = (id: string) => {
    setEditId(id);
  };

  return (
    <div>
      {data.map(
        ({
          id,
          author,
          content,
          createdAt,
          updatedAt,
          postId,
          parentCommentId,
        }) => (
          <div key={id}>
            {editId === id ? (
              <ReplyModifyForm
                id={id}
                postId={postId}
                parentCommentId={parentCommentId}
                onEdit={() => handleEdit('')}
              />
            ) : (
              <Comment
                author={author}
                content={content}
                createdAt={createdAt}
                updatedAt={updatedAt}
                onEdit={() => handleEdit(id)}
              />
            )}
          </div>
        )
      )}
      {isLoading ? <p>Loading...</p> : <div ref={targetRef} />}
    </div>
  );
}
