'use server';

import { revalidatePath } from 'next/cache';

import { createPost } from '@/entities/post';
import { CreatePostDTO } from '@/shared/types';

// 새 게시글 작성 (POST /posts)
export async function createPostAction(_: unknown, formData: FormData) {
  try {
    // FormData에서 값을 가져와 DTO로 변환
    const postData: CreatePostDTO = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      author: formData.get('author') as string,
    };
    // 필수 값 확인
    if (!postData.title || !postData.content || !postData.author) {
      return {
        status: false,
        error: '게시글 작성이 잘못되었습니다.',
      };
    }

    const postId = (await createPost(postData)).id;

    revalidatePath('/');
    return {
      status: true,
      error: '',
      postId: postId,
    };
  } catch (err) {
    return {
      status: false,
      error: `게시글 저장에 실패했습니다: ${err}`,
    };
  }
}
