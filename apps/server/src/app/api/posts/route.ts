import { NextRequest, NextResponse } from 'next/server';

import { CreatePostDTO, Post } from '@/types';
import { readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts:
 *   post:
 *     tags: ['Posts']
 *     summary: 새 게시글 작성
 *     description: 새로운 게시글을 생성합니다
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePostDTO'
 *     responses:
 *       200:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreatePostDTO = await request.json();
    const data = await readData();

    const newPost: Post = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.posts.unshift(newPost);
    await writeData(data);

    return NextResponse.json(newPost);
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
