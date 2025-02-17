import { NextRequest, NextResponse } from 'next/server';

import { Post, UpdatePostDTO } from '@/types';
import { readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: ['Posts']
 *     summary: 특정 게시글 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 게시글의 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await readData();
    const { id } = await params;
    const post = data.posts.find((p) => p.id === id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: ['Posts']
 *     summary: 게시글 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 게시글의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePostDTO'
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body: UpdatePostDTO = await request.json();
    const { id } = await params;
    const data = await readData();
    console.log('id', id);

    const postIndex = data.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const currentPost = data.posts[postIndex] as Post;
    const updatedPost: Post = {
      id: currentPost.id,
      title: body.title ?? currentPost.title,
      content: body.content ?? currentPost.content,
      author: body.author ?? currentPost.author,
      createdAt: currentPost.createdAt,
      updatedAt: new Date().toISOString(),
    };

    data.posts[postIndex] = updatedPost;

    await writeData(data);
    return NextResponse.json(data.posts[postIndex]);
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: ['Posts']
 *     summary: 게시글 삭제
 *     description: 게시글과 관련된 모든 댓글이 함께 삭제됩니다
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 게시글의 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: 게시글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await readData();
    const { id } = await params;

    const postIndex = data.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts.splice(postIndex, 1);
    // 관련된 댓글도 함께 삭제
    data.comments = data.comments.filter((c) => c.postId !== id);

    await writeData(data);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
