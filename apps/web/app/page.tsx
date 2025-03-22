import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { getInfiniteScrollData } from '@/features/post/post-list/api/post-infinite-scroll';
import { PostInfiniteScroll } from '@/features/post/post-list/ui/post-infinite-scroll';

export default async function Home() {
  const { data, nextCursor, hasMore } = await getInfiniteScrollData('', 10);

  return (
    <>
      <Button asChild>
        <Link href="/posts/write">새 글 작성</Link>
      </Button>

      <PostInfiniteScroll
        postList={data}
        lastPostId={nextCursor}
        hasMore={hasMore}
      />
    </>
  );
}
