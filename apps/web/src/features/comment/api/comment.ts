import { Comment } from '../types';

export async function responseComments(
  postId: string
): Promise<{ data: Comment[] }> {
  const response = await fetch(
    `http://localhost:4000/api/posts/${postId}/comments`,
    {
      method: 'GET',
    }
  );
  const data = await response.json();
  console.log('test', data);
  return data;
}
