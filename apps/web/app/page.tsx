import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { getInfiniteScrollData } from '@/features/post/post-list';
import { PostInfiniteScroll } from '@/features/post/post-list';
import { PostListPagination } from '@/features/post/post-list/ui/post-list-pagination';

export default async function Home() {
  const { data, nextCursor, hasMore } = await getInfiniteScrollData('', 10);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <Button asChild>
        <Link href="/posts/write">새 글 작성</Link>
      </Button>

      <PostListPagination />

      <PostInfiniteScroll
        postList={data}
        lastPostId={nextCursor}
        hasMore={hasMore}
      />
    </main>
  );
}
