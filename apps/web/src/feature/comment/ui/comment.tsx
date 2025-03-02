import { Button } from '@workspace/ui/components/button';
import Image from 'next/image';

import { profile } from '@/src/shared/assets';
import { formatTimeAgo } from '@/src/shared/lib';
export function Comment({
  author,
  content,
  createdAt,
  updatedAt,
  onEdit,
}: {
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex space-x-4 py-[100px]">
      <div className="relative size-12 overflow-hidden rounded-full">
        <Image src={profile} alt="profile" fill={true} objectFit="cover" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">{author}</h3>
          <span className="text-sm text-gray-500">
            {formatTimeAgo(updatedAt ? updatedAt : createdAt)}
          </span>
        </div>
        <p className="text-gray-700">{content}</p>
        <div className="flex space-x-2">
          <Button onClick={onEdit}>수정</Button>
        </div>
      </div>
    </div>
  );
}
