import { promises as fs } from 'fs';
import path from 'path';

import { Comment, DatabaseStructure } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src/data/db.json');

export async function readData(): Promise<DatabaseStructure> {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

export async function writeData(data: DatabaseStructure): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}

export function getReplyCount(comments: Comment[], parentId: string): number {
  return comments.filter((comment) => comment?.parentCommentId === parentId)
    .length;
}
