'use client';
import { Button } from '@workspace/ui/components/button';
import { useActionState, useTransition } from 'react';

import { replymodify } from '@/src/feature/reply/model/reply-modify';

export function ReplyModifyForm({
  id,
  postId,
  parentCommentId,
  onEdit,
}: {
  id: string;
  postId: string;
  parentCommentId: string;
  onEdit: () => void;
}) {
  const [state, dispatch] = useActionState(replymodify, { message: '' });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(() => {
      dispatch(formData);
      onEdit();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 py-[100px]">
      <textarea
        className="border-input flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name="content"
        placeholder="댓글을 작성해 주세요..."
        defaultValue={''}
      />
      <input type="hidden" name="postId" value={postId || ''} />
      <input type="hidden" name="commentId" value={parentCommentId || ''} />
      <input type="hidden" name="replyId" value={id || ''} />
      <Button variant={'default'}>
        {isPending ? '수정 중...' : '수정 하기'}
      </Button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}
