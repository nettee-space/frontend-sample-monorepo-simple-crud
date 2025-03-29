import { Post } from '@/entities/post';
import { formatToLocaleDate } from '@/shared/lib';

export interface PostViewModel extends Post {
  localeCreatedAt: string;
}

export const mapPostToViewModel = (post: Post): PostViewModel => ({
  ...post,
  localeCreatedAt: formatToLocaleDate(post.createdAt),
});
