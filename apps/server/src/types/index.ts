export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  parentCommentId?: string;
  replyCount?: number;
}

export interface DatabaseStructure {
  posts: Post[];
  comments: Comment[];
}

export type CreatePostDTO = Pick<Post, 'title' | 'content' | 'author'>;
export type UpdatePostDTO = Partial<CreatePostDTO>;
export type CreateCommentDTO = Pick<Comment, 'content' | 'author'>;
export type UpdateCommentDTO = Partial<CreateCommentDTO>;

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

export type GetCommentsCursor = CursorPaginationResponse<Comment>;
export type GetCommentsOffset = OffsetPaginationResponse<Comment>;
