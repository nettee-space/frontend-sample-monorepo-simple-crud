import { NextRequest, NextResponse } from 'next/server';

import { Comment } from '@/types';
import { readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}/replies/{replyId}:
 *   put:
 *     tags: ['Replies']
 *     summary: 대댓글 수정
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글의 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 부모 댓글의 ID
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: string
 *         description: 수정할 대댓글의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCommentDTO'
 *           example:
 *             content: "수정된 대댓글 내용"
 *             author: "수정된 작성자"
 *     responses:
 *       200:
 *         description: 대댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 리소스를 찾을 수 없음
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
  {
    params,
  }: { params: Promise<{ id: string; commentId: string; replyId: string }> }
) {
  try {
    const { id, commentId, replyId } = await params;
    const body = await request.json();

    const data = await readData();

    // 게시글 존재 확인
    const postExists = data.posts.some((post) => post.id === id);
    if (!postExists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 부모 댓글 존재 확인
    const parentComment = data.comments.find(
      (comment) =>
        comment.id === commentId &&
        comment.postId === id &&
        !comment.parentCommentId
    );
    if (!parentComment) {
      return NextResponse.json(
        { error: 'Parent comment not found' },
        { status: 404 }
      );
    }

    // 대댓글 찾기
    const replyIndex = data.comments.findIndex(
      (comment) =>
        comment.id === replyId &&
        comment.postId === id &&
        comment.parentCommentId === commentId
    );

    if (replyIndex === -1) {
      return NextResponse.json({ error: 'Reply not found' }, { status: 404 });
    }

    // 대댓글 수정
    data.comments[replyIndex] = {
      ...data.comments[replyIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    } as Comment;

    await writeData(data);

    return NextResponse.json(data.comments[replyIndex]);
  } catch (error) {
    console.error('Failed to update reply:', error);
    return NextResponse.json(
      { error: 'Failed to update reply' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}/replies/{replyId}:
 *   delete:
 *     tags: ['Replies']
 *     summary: 대댓글 삭제
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글의 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 부모 댓글의 ID
 *       - in: path
 *         name: replyId
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 대댓글의 ID
 *     responses:
 *       200:
 *         description: 대댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: 리소스를 찾을 수 없음
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
  {
    params,
  }: { params: Promise<{ id: string; commentId: string; replyId: string }> }
) {
  try {
    const { id, commentId, replyId } = await params;
    const data = await readData();

    // 게시글 존재 확인
    const postExists = data.posts.some((post) => post.id === id);
    if (!postExists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 부모 댓글 존재 확인
    const parentComment = data.comments.find(
      (comment) =>
        comment.id === commentId &&
        comment.postId === id &&
        !comment.parentCommentId
    );
    if (!parentComment) {
      return NextResponse.json(
        { error: 'Parent comment not found' },
        { status: 404 }
      );
    }

    // 대댓글 존재 확인
    const replyExists = data.comments.some(
      (comment) =>
        comment.id === replyId &&
        comment.postId === id &&
        comment.parentCommentId === commentId
    );

    if (!replyExists) {
      return NextResponse.json({ error: 'Reply not found' }, { status: 404 });
    }

    // 대댓글 삭제
    data.comments = data.comments.filter((comment) => comment.id !== replyId);

    await writeData(data);

    return NextResponse.json({ message: 'Reply deleted successfully' });
  } catch (error) {
    console.error('Failed to delete reply:', error);
    return NextResponse.json(
      { error: 'Failed to delete reply' },
      { status: 500 }
    );
  }
}
