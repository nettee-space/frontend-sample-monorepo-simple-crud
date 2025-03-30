import { getPostById, mapPostToViewModel } from '@/entities/post';
import { PostViewModel } from '@/entities/post/model/post-view-model';

interface PostDetailProps {
  params: { id: string };
}

export async function PostDetail({ params }: PostDetailProps) {
  let post: PostViewModel | null = null;
  let error: string | null = null;

  const id = (await params).id;

  try {
    const data = await getPostById(id);
    post = mapPostToViewModel(data);
  } catch (err) {
    console.error(err);
    error = '게시글을 불러오는 중 오류가 발생했습니다.';
  }

  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="mx-8 my-4 rounded border border-gray-400 p-4">
      <h3 className="pb-4 font-semibold">{post.title}</h3>
      <hr />
      <p className="min-h-[30vh] whitespace-pre-wrap pt-4">{post.content}</p>
      <br />
      <div className="flex flex-col gap-2">
        <span className="rounded border border-gray-300 bg-gray-300 px-2 py-0.5 italic">
          {post.author}
        </span>
        <time>{post.localeCreatedAt}</time>
      </div>
    </div>
  );
}
