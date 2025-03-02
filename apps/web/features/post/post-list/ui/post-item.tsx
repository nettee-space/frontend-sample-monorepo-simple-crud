import Link from 'next/link';

export function PostItem({
  linkPostId = '',
  title = '',
  content = '',
  author = '',
  localeCreatedAt = '',
}) {
  return (
    <div className="mx-8 my-4 rounded border border-gray-400 p-4">
      <Link href={`/posts/${linkPostId}`}>
        <h3 className="pb-4 font-semibold">{title}</h3>
        <hr />
        <p className="pt-4">{content}</p>
        <br></br>
        <div className="flex flex-col gap-2">
          <span className="rounded border border-gray-300 bg-gray-300 px-2 py-0.5 italic">
            {author}
          </span>
          <time>{localeCreatedAt}</time>
        </div>
      </Link>
    </div>
  );
}
