'use client';
import { Button } from '@workspace/ui/components/button';
import { useActionState } from 'react';
import { startTransition } from 'react';

import { replyAdd } from '@/src/feature/reply/api/reply-add';

export function ReplyForm() {
  const [state, dispatch] = useActionState(replyAdd, { message: '' }, '/');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        name="content"
        placeholder="댓글을 작성해 주세요..."
        defaultValue={''}
      />
      <Button variant={'default'}>댓글 달기</Button>

      <p>{state.message}</p>
    </form>
  );
}
