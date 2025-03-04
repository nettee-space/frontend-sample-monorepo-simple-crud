import { deleteReply } from '@/src/feature/reply/api/reply-api';

export async function replyDelete(
  postId: string,
  parentCommentId: string,
  replyId: string
) {
  try {
    await deleteReply(postId, parentCommentId, replyId);
  } catch (error) {
    console.error('Error deleting reply:', error);

    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
  }
}
