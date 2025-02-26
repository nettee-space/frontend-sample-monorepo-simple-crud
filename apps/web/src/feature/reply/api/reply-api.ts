import { fetchWrapper } from '@/src/shared/api';

import {
  CreateReplyDTO,
  ReplyCursorPaginationResponse,
  UpdateReplyDTO,
} from '../types/reply-type';

export const getReply = async (
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

export const createReply = async (
  postId: string,
  commentId: string,
  content: CreateReplyDTO
): Promise<void> => {
  return fetchWrapper.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    JSON.stringify(content)
  );
};

export const deleteReply = async (
  postId: string,
  commentId: string,
  replyId: string
): Promise<void> => {
  return fetchWrapper.delete(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}`
  );
};

export const updateReply = async (
  postId: string,
  commentId: string,
  replyId: string,
  content: UpdateReplyDTO
): Promise<void> => {
  return fetchWrapper.put(
    `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
    JSON.stringify(content)
  );
};
