'use client';

import { Button } from '@workspace/ui/components/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  ERROR_MESSAGES,
  getPostsByPage,
  mapPostToViewModel,
  PostViewModel,
} from '@/entities/post';
import { PostItem } from '@/features/post/post-list';
import { usePagination } from '@/shared/hooks/usePagination';

export function PostListPagination() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 10;

  const { paginationButtons } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage
  );

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await getPostsByPage(currentPage, postsPerPage);
        setPosts(response.data.map(mapPostToViewModel));
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(`❌ ${ERROR_MESSAGES.FETCH_FAILED}:`, error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-2xl font-bold">게시글 목록</h1>
      <div className="flex w-full max-w-4xl flex-col gap-4">
        <div className="flex justify-end">
          <Button onClick={() => router.push('/posts/write')}>글쓰기</Button>
        </div>{' '}
        <ul className="w-full">
          {isLoading ? (
            <p className="text-center text-gray-500">로딩 중...</p>
          ) : (
            posts.map((post) => (
              <PostItem
                key={post.id}
                linkPostId={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                localeCreatedAt={post.localeCreatedAt}
              />
            ))
          )}
        </ul>
      </div>
      {/* 페이지네이션 */}
      <div className="mt-6 flex items-center gap-2">{paginationButtons}</div>
    </div>
  );
}
