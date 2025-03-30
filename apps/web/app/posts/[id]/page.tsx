import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { PostDetail } from '@/features/post/post-detail';

export default async function PostPage({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div>
      <div className="mx-8 flex gap-2">
        <Button asChild>
          <Link href={'/'}>목록으로</Link>
        </Button>
        <Button asChild>
          <Link href={`/posts/${id}/edit`}>수정</Link>
        </Button>
      </div>
      <PostDetail params={params} />
    </div>
  );
}
