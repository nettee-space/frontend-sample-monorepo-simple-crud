'use server';

import { updateReply } from './reply-api';

type State = {
  message?: string | null;
};

export async function replymodify(prevState: State, queryData: FormData) {
  const postId = queryData.get('postId') as string;
  const commentId = queryData.get('commentId') as string;
  const replyId = queryData.get('replyId') as string;
  const content = queryData.get('content') as string;
  const author = 'guest';

  if (!content.trim()) {
    return { message: '모든 빈 칸을 입력해주세요' };
  }

  try {
    await updateReply(postId, commentId, replyId, { content, author });
    return { message: '수정 완료' };
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    return { message: '수정 실패' };
  }
}
