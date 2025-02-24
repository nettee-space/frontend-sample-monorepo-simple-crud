import Link from 'next/link';

import { getInfiniteScrollData } from '@/features/post/post-list/api/post-infinite-scroll';
import { InfiniteScroll } from '@/features/post/post-list/ui/infinite-scroll';
import { Button } from '@/shared/ui/button';

export default async function Home() {
  const { data, nextCursor, hasMore } = await getInfiniteScrollData('', 10);

  return (
    <>
      <Button
        divClassName="text-right mr-8"
        buttonClassName="bg-black text-white font-semibold text-base p-2 rounded"
      >
        <Link href="/posts/write">새 글 작성</Link>
      </Button>

      <InfiniteScroll
        postList={data}
        lastPostId={nextCursor}
        hasMore={hasMore}
      />
    </>
  );
}
