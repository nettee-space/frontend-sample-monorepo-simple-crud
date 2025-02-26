import { ReplyList } from '@/src/feature/reply/ui/reply-list';
export function HomePage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <ReplyList />
      </div>
    </div>
  );
}
