import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { getInfiniteScrollData } from '@/features/post/post-list';
import { PostInfiniteScroll } from '@/features/post/post-list';

export default async function Home() {
  const { data, nextCursor, hasMore } = await getInfiniteScrollData('', 10);

  return (
    <div>
      <Button asChild className="mx-8">
        <Link href="/posts/write">새 글 작성</Link>
      </Button>

      <PostInfiniteScroll
        postList={data}
        lastPostId={nextCursor}
        hasMore={hasMore}
      />
    </div>
  );
}
