import { fetchWrapper } from '@/src/shared/api';

import {
  CreateReplyDTO,
  ReplyCursorPaginationResponse,
  UpdateReplyDTO,
} from '../types/Reply';

export const getReply = (
  postId: string,
  commentId: string,
  cursor?: string,
  limit?: number
): Promise<ReplyCursorPaginationResponse> => {
  const queryParams = new URLSearchParams();
  if (cursor) queryParams.append('cursor', cursor);
  if (limit) queryParams.append('limit', limit.toString());

  return fetchWrapper.get(
    `posts/${postId}/comments/${commentId}/replies?${queryParams.toString()}`
  );
};

export const createReply = (
  postId: string,
  commentId: string,
  content: CreateReplyDTO
): Promise<CreateReplyDTO> => {
  return fetchWrapper.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    content
  );
};

export const deleteReply = (
  postId: string,
  commentId: string,
  replyId: string
): Promise<void> => {
  return fetchWrapper.delete(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}`
  );
};

export const updateReply = (
  postId: string,
  commentId: string,
  replyId: string,
  content: UpdateReplyDTO
): Promise<UpdateReplyDTO> => {
  return fetchWrapper.put(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
    content
  );
};
