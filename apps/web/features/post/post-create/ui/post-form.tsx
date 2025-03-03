'use client';

import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { createPostAction } from '@/features/post/actions';

export function PostForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(createPostAction, null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (state?.status) {
      router.push(`/posts/${state.postId}`);
    } else if (state?.error) {
      alert(state.error);
      setIsSubmitted(false);
    }
  }, [state, router]);

  const handleSubmit = (_: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitted(true);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <h1>새 게시글 작성</h1>
      <div>
        <label>제목</label>
        <input disabled={isPending || isSubmitted} name="title" required />
      </div>
      <div>
        <label>내용</label>
        <textarea disabled={isPending || isSubmitted} name="content" required />
      </div>
      <div>
        <label>작성자</label>
        <input disabled={isPending || isSubmitted} name="author" required />
      </div>
      <Button type="submit" disabled={isPending || isSubmitted}>
        {isPending ? '저장 중...' : '작성하기'}
      </Button>
    </form>
  );
}
