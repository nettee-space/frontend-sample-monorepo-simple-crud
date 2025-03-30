'use client';

import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { Post } from '@/entities/post';
import { createPostAction, updatePostAction } from '@/features/post/actions';
import { TextField } from '@/shared/ui';

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(post);

  const [actionResult, formAction, isPending] = useActionState(
    isEditMode ? updatePostAction : createPostAction,
    null
  );

  return (
    <form action={formAction} className="mx-8 flex flex-col">
      <h1 className="mb-4 text-center text-xl font-bold">
        {isEditMode ? '게시글 수정' : '새 게시글 작성'}
      </h1>

      {post?.id && <input type="hidden" name="postId" value={post.id} />}

      <TextField
        name="title"
        label="제목"
        required
        disabled={isPending}
        defaultValue={post?.title || ''}
      />
      <TextField
        name="content"
        label="내용"
        required
        disabled={isPending}
        isTextArea
        defaultValue={post?.content || ''}
        className="min-h-[30vh]"
      />
      <TextField
        name="author"
        label="작성자"
        required
        disabled={isPending}
        readOnly={!!post}
        defaultValue={post?.author || ''}
      />

      {actionResult?.status === false && (
        <p className="mt-2 text-sm text-red-500">{actionResult.error}</p>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          취소
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? '저장 중...' : '작성하기'}
        </Button>
      </div>
    </form>
  );
}
