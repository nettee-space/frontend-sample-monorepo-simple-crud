import Image from 'next/image';

import { profile } from '@/src/shared/assets';

export function Comment({
  author,
  content,
}: {
  author: string;
  content: string;
}) {
  return (
    <div className="flex space-x-4 py-[100px]">
      <div className="relative size-12 overflow-hidden rounded-full">
        <Image src={profile} alt="profile" fill={true} objectFit="cover" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">{author}</h3>
          <span className="text-sm text-gray-500">almost 2 years ago</span>
        </div>
        <p className="text-gray-700">{content}</p>
        <div className="flex space-x-2">
          {/* <OutLineButton text={'수정'} action={}/>
                    <OutLineButton text={'삭제'} action={}/> */}
        </div>
      </div>
    </div>
  );
}
