'use server';

import { createReply } from '@/src/feature/reply/api/reply-api';
type State = {
  message?: string | null;
};

export async function replyAdd(prevState: State, queryData: FormData) {
  const postId = queryData.get('postId') as string;
  const commentId = queryData.get('commentId') as string;
  const content = queryData.get('content') as string;
  // const author = queryData.get("author") as string;
  const author = 'guest';
  if (!content) {
    return { message: '모든 빈 칸을 입력해주세요' };
  }

  await createReply(postId, commentId, { content, author });
  return { message: '댓글 작성 완료' };
}
