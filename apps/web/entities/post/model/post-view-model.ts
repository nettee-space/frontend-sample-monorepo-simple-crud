import { Post } from '@/entities/post';
import { formatToLocaleDate } from '@/shared/lib';

export const mapPostToViewModel = (post: Post) => ({
  ...post,
  localeCreatedAt: formatToLocaleDate(post.createdAt),
});
