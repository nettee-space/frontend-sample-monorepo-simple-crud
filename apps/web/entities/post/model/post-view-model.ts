import { Post } from '@/entities/post';
import { formatToLocaleDate } from '@/shared/lib';

export interface PostViewModel {
  id: string;
  title: string;
  content: string;
  author: string;
  localeCreatedAt: string;
}

export const mapPostToViewModel = (post: Post): PostViewModel => ({
  id: post.id,
  title: post.title,
  content: post.content,
  author: post.author,
  localeCreatedAt: formatToLocaleDate(post.createdAt),
});
