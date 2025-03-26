'use client';
import { Button } from '@workspace/ui/components/button';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

import { replyAdd } from '@/src/feature/reply/model/reply-add';

export function ReplyForm() {
  const [state, dispatch] = useActionState(replyAdd, { message: '' }, '/');
  const searchParams = useSearchParams();
  const parentId = searchParams.get('postId');
  const postId = searchParams.get('parentCommentId');

  return (
    <form action={dispatch}>
      <textarea
        className="border-input flex min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name="content"
        placeholder="댓글을 작성해 주세요..."
        defaultValue={''}
      />
      <input type="hidden" name="postId" value={postId || ''} />
      <input type="hidden" name="parentCommentId" value={parentId || ''} />
      <Button variant={'default'}>댓글 달기</Button>
      <p>{state.message}</p>
    </form>
  );
}
