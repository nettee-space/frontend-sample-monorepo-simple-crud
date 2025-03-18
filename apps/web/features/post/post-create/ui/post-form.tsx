'use client';

import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { createPostAction } from '@/features/post/actions';
import { TextField } from '@/shared/ui';

export function PostForm() {
  const router = useRouter();
  const [actionResult, formAction, isPending] = useActionState(
    createPostAction,
    null
  );

  return (
    <form action={formAction}>
      <h1 className="mb-4 text-xl font-bold">새 게시글 작성</h1>
      <TextField name="title" label="제목" required disabled={isPending} />
      <TextField
        name="content"
        label="내용"
        required
        disabled={isPending}
        isTextArea
      />
      <TextField name="author" label="작성자" required disabled={isPending} />
      {actionResult?.status === false && (
        <p className="mt-2 text-sm text-red-500">{actionResult.error}</p>
      )}
      <Button type="button" variant="outline" onClick={() => router.back()}>
        취소
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? '저장 중...' : '작성하기'}
      </Button>
    </form>
  );
}
