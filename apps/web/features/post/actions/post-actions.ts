'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createPost,
  CreatePostDTO,
  ERROR_MESSAGES,
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
