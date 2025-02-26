import { CommentType } from '@/src/feature/comment/types/comment-type';

export interface CreateReplyDTO {
  content: string;
  author: string;
}
export interface UpdateReplyDTO {
  content: string;
  author: string;
}
export interface ReplyCursorPaginationResponse {
  data: CommentType[];
  nextCursor: string; // default : true
  hasMore: boolean;
}
