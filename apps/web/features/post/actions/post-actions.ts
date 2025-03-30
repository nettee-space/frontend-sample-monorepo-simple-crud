'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  createPost,
  CreatePostDTO,
  ERROR_MESSAGES,
  extractFormData,
  getValidatedFields,
  updatePost,
  UpdatePostDTO,
} from '@/entities/post';

// 게시글 작성 서버 액션
export async function createPostAction(_: unknown, formData: FormData) {
  let postId: string | null = null;

  try {
    const rawData = extractFormData<CreatePostDTO>(formData, [
      'title',
      'content',
      'author',
    ]);
    const validatedData: CreatePostDTO = getValidatedFields(rawData);

    postId = (await createPost(validatedData)).id;

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
  redirect(`/posts/${postId}`);
}

// 게시글 수정 서버 액션
export async function updatePostAction(_: unknown, formData: FormData) {
  const postId = formData.get('postId') as string;
  if (!postId) {
    return { status: false, error: ERROR_MESSAGES.INVALID_ID };
  }

  try {
    const rawData = extractFormData<UpdatePostDTO>(formData, [
      'title',
      'content',
      'author',
    ]);
    const validatedData: UpdatePostDTO = getValidatedFields(rawData);

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
