'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { getInfiniteScrollData } from '@/features/post/post-list/api/post-infinite-scroll';
import { PostItem } from '@/features/post/post-list/ui/post-item';
import { formatToLocaleDate } from '@/shared/lib/format-date';
import { Post } from '@/shared/types/post-types';

type InfiniteScrollProps = {
  postList: Post[];
  lastPostId: string | null;
  hasMore: boolean;
};

export function InfiniteScroll({
  postList,
  lastPostId,
  hasMore,
}: InfiniteScrollProps) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>(postList);
  const [cursor, setCursor] = useState(lastPostId ? lastPostId : null);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loading || !cursor) return;

    setLoading(true);

    try {
      const { data } = await getInfiniteScrollData(cursor, 10);
      setPosts((prevPosts) => [...prevPosts, ...data]);
      const lastItem = data.at(-1);
      setCursor(lastItem ? lastItem.id : null);
    } catch (error) {
      console.error('Failed to fetch more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading]);

  const target = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry?.isIntersecting) loadMorePosts();
    });

    const currentTarget = target.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [loadMorePosts]);

  return (
    <div>
      {posts.map(({ id, title, content, author, createdAt }) => {
        const localeCreatedAt = formatToLocaleDate(createdAt);
        return (
          <PostItem
            key={id}
            linkPostId={id}
            title={title}
            content={content}
            author={author}
            localeCreatedAt={localeCreatedAt}
          />
        );
      })}
      <h3
        ref={target}
        className="mx-8 mb-4 mt-8 text-center text-9xl font-semibold"
      >
        {posts.at(-1)?.id === cursor
          ? '*************더 많은 게시글 로딩 중****************'
          : ''}
      </h3>
    </div>
  );
}
