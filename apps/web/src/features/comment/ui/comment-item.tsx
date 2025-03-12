import { Comment } from '../types';

export function CommentItem({
  id,
  postId,
  author,
  content,
  createdAt,
}: Comment) {
  return (
    <div>
      <p>게시글 번호: {postId}</p>
      <h2>
        작성자: {author}, {id}
      </h2>
      <p>작성일자: {createdAt}</p>
      <p>내용: {content}</p>
    </div>
  );
}
