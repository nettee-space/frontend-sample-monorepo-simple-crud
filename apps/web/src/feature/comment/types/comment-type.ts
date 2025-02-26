export interface CommentType {
  id: string;
  postId: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId: string; // default : true
  ReplyCount: number; // default : true
}
