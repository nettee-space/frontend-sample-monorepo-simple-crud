import type {
  CreatePostDTO,
  GetPostsOffset,
  Post,
  UpdatePostDTO,
} from '@/entities/post';
import { httpClient } from '@/shared/api';

// 게시글 생성 (POST /posts)
export const createPost = async (postData: CreatePostDTO): Promise<Post> => {
  return httpClient<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

// 모든 게시글 조회 (GET /posts)
export const getPosts = async (): Promise<Post[]> => {
  return httpClient<Post[]>('/posts');
};

// 특정 게시글 조회 (GET /posts/{id})
export const getPostById = async (postId: string): Promise<Post> => {
  return httpClient<Post>(`/posts/${postId}`);
};

// 게시글 수정 (PUT /posts/{id})
export const updatePost = async (
  postId: string,
  updatedData: UpdatePostDTO
): Promise<Post> => {
  return httpClient<Post>(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });
};

// 게시글 삭제 (DELETE /posts/{id})
export const deletePost = async (
  postId: string
): Promise<{ message: string }> => {
  return httpClient<{ message: string }>(`/posts/${postId}`, {
    method: 'DELETE',
  });
};

// 오프셋 기반 게시글 목록 조회 (현재 페이지와 전체 페이지 정보 포함)
export const getPostsByPage = async (
  page: number = 1,
  limit: number = 10
): Promise<GetPostsOffset> => {
  return httpClient<GetPostsOffset>(
    `/posts/paginated?page=${page}&limit=${limit}`
  );
};
