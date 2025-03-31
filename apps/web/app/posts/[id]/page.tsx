import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { PostDetail } from '@/features/post/post-detail';

export default async function PostPage({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <>
      <PostDetail params={params} />
      <div className="flex flex-col items-end">
        <div className="mx-8 flex gap-2">
          <Button asChild>
            <Link href={'/'}>목록</Link>
          </Button>
          <Button asChild>
            <Link href={`/posts/edit/${id}`}>수정</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
