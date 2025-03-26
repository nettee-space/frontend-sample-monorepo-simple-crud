'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createPost,
  CreatePostDTO,
  ERROR_MESSAGES,
  updatePost,
  UpdatePostDTO,
  validateFormField,
} from '@/entities/post';

export async function createPostAction(_: unknown, formData: FormData) {
  let postId: string | null = null;

  try {
    const title = validateFormField(formData.get('title'), 'title');
    const content = validateFormField(formData.get('content'), 'content');
    const author = validateFormField(formData.get('author'), 'author');

    const postData: CreatePostDTO = { title, content, author };

    postId = (await createPost(postData)).id;

    revalidatePath('/');
  } catch (error) {
    return {
      status: false,
      error:
        error instanceof Error
          ? `${ERROR_MESSAGES.SAVE_FAILED} ${error.message}`
          : `${ERROR_MESSAGES.SAVE_FAILED} 알 수 없는 오류`,
    };
  }

  if (postId) {
    redirect(`/posts/${postId}`);
  }

  return {
    status: false,
    error: '처리 중 예상치 못한 문제가 발생했습니다.',
  };
}
export async function updatePostAction(_: unknown, formData: FormData) {
  const postId = formData.get('postId') as string;
  if (!postId) {
    return { status: false, error: ERROR_MESSAGES.INVALID_ID };
  }

  try {
    const rawTitle = formData.get('title');
    const rawContent = formData.get('content');
    const rawAuthor = formData.get('author');

    const title = rawTitle ? validateFormField(rawTitle, 'title') : undefined;
    const content = rawContent
      ? validateFormField(rawContent, 'content')
      : undefined;
    const author = rawAuthor
      ? validateFormField(rawAuthor, 'author')
      : undefined;

    const validatedData: UpdatePostDTO = { title, content, author };

    await updatePost(postId, validatedData);

    revalidatePath('/');
  } catch (error) {
    return {
      status: false,
      error:
        error instanceof Error
          ? `${ERROR_MESSAGES.UPDATE_FAILED} ${error.message}`
          : `${ERROR_MESSAGES.UPDATE_FAILED} 알 수 없는 오류`,
    };
  }

  redirect(`/posts/${postId}`);
}
