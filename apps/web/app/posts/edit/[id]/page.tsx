import { notFound } from 'next/navigation';

import { getPostById } from '@/entities/post';
import { PostForm } from '@/features/post/post-editor';

interface PostEditPageProps {
  params: { id: string };
}

export default async function PostEditPage({ params }: PostEditPageProps) {
  const postId = (await params).id;
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return <PostForm post={post} />;
}
