import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

import { getInfiniteScrollData } from '@/features/post/post-list';
import { PostInfiniteScroll } from '@/features/post/post-list';
import { PostListPagination } from '@/features/post/post-list/ui/post-list-pagination';

export default async function Home() {
  const { data, nextCursor, hasMore } = await getInfiniteScrollData('', 10);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="mx-8 my-4 text-center text-2xl font-bold">
          게시글 목록
        </h1>
        <div className="flex justify-end">
          <Button asChild className="mx-8">
            <Link href="/posts/write">새 글 작성</Link>
          </Button>
        </div>
      </div>
      <PostListPagination />
      <PostInfiniteScroll
        postList={data}
        lastPostId={nextCursor}
        hasMore={hasMore}
      />
    </>
  );
}
