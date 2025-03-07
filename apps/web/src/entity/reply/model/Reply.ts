export interface CreateReplyDTO {
  content: string;
  author: string;
}
export interface UpdateReplyDTO {
  content: string;
  author: string;
}
export interface ReplyCursorPaginationResponse {
  data: ReplyType[];
  nextCursor: string; // default : true
  hasMore: boolean;
}
export interface ReplyType {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId: string;
}
