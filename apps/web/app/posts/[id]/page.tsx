import Link from 'next/link';

import { PostDetail } from '@/features/post/post-detail';

// 특정 게시글 페이지 - 게시글 생성 후 넘어가지는지 확인용으로 만든 임시 페이지
export default function PostPage() {
  return (
    <main>
      <PostDetail />
      <Link href={'/'}>목록으로</Link>
    </main>
  );
}
