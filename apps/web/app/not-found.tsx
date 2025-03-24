import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          어머! 없어요...
        </h2>
        <p className="mb-6 text-gray-600">아니 없어요 그냥...</p>
        <Link
          href="/"
          className="inline-block rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
