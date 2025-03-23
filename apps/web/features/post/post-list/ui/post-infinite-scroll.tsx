'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { mapPostToViewModel } from '@/entities/post';
import { Post } from '@/entities/post';
import { getInfiniteScrollData } from '@/features/post/post-list';
import { PostItem } from '@/features/post/post-list';

type PostInfiniteScrollProps = {
  postList: Post[];
  lastPostId: string | null;
  hasMore: boolean;
};

export function PostInfiniteScroll({
  postList,
  lastPostId,
  hasMore,
}: PostInfiniteScrollProps) {
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

  const postViewModels = useMemo(
    () => posts.map((post) => mapPostToViewModel(post)),
    [posts]
  );

  return (
    <div>
      {postViewModels.map((postViewModel) => (
        <PostItem
          key={postViewModel.id}
          linkPostId={postViewModel.id}
          title={postViewModel.title}
          content={postViewModel.content}
          author={postViewModel.author}
          localeCreatedAt={postViewModel.localeCreatedAt}
        />
      ))}
      <h3
        ref={target}
        className="mx-8 mb-4 mt-8 text-center text-2xl font-semibold"
      >
        {posts.at(-1)?.id === cursor
          ? '*************더 많은 게시글 로딩 중****************'
          : ''}
      </h3>
    </div>
  );
}
