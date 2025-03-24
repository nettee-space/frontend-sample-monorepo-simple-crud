'use client';

import { Button } from '@workspace/ui/components/button';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getPostById } from '@/entities/post';
import { Post } from '@/entities/post';
import { formatToLocaleDate } from '@/shared/lib';

// 특정 게시글 페이지 - 게시글 생성 후 넘어가지는지 확인용으로 만든 임시 컴포넌트
export function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      try {
        setIsLoading(true);
        const data = await getPostById(id as string);
        setPost(data);
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (isLoading) return <p className="text-center text-gray-500">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post)
    return (
      <p className="text-center text-gray-500">게시글을 찾을 수 없습니다.</p>
    );

  return (
    <div className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md">
      <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
      <p className="whitespace-pre-line text-gray-700">{post.content}</p>
      <div className="text-sm text-gray-500">
        <p>작성자: {post.author}</p>
        <p>작성일: {formatToLocaleDate(post.createdAt)}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="outline" onClick={() => router.push('/')}>
          목록으로
        </Button>
        <Button onClick={() => router.push(`/posts/edit/${post.id}`)}>
          수정하기
        </Button>
      </div>
    </div>
  );
}
