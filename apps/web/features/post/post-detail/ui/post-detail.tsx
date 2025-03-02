'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getPostById } from '@/entities/post';
import { formatToLocaleDate } from '@/shared/lib';
import { Post } from '@/shared/types';

// 특정 게시글 페이지 - 게시글 생성 후 넘어가지는지 확인용으로 만든 임시 컴포넌트
export function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {formatToLocaleDate(post.createdAt)}</p>
    </div>
  );
}
