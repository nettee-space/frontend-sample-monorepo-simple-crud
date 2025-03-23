export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export type CreatePostDTO = Pick<Post, 'title' | 'content' | 'author'>;
export type UpdatePostDTO = Partial<CreatePostDTO>;

interface CursorPaginationResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
}
interface OffsetPaginationResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export type GetPostsCursor = CursorPaginationResponse<Post>;
export type GetPostsOffset = OffsetPaginationResponse<Post>;
