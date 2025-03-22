import { formatToLocaleDate } from '@/shared/lib/format-date';
import { Post } from '@/shared/types/post-types';

export const mapPostToViewModel = (post: Post) => ({
  ...post,
  localeCreatedAt: formatToLocaleDate(post.createdAt),
});
