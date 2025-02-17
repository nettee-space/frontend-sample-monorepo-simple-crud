import { NextRequest, NextResponse } from 'next/server';

import { Comment, CreateCommentDTO } from '@/types';
import { readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts/{id}/comments/{commentId}/replies:
 *   get:
 *     tags: ['Replies']
 *     summary: 특정 댓글의 대댓글 목록 조회 (커서 기반 페이지네이션)
 *     parameters:
 *       - in: path
 *         name: id
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
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: string
 *         description: 다음 페이지 커서
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: 한 페이지당 항목 수
 *         default: 10
 *     responses:
 *       200:
 *         description: 대댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentCursorPaginationResponse'
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const { id, commentId } = await params;
    const { searchParams } = new URL(request.url);

    const cursor = searchParams.get('cursor');
    const limit = Number(searchParams.get('limit')) || 10;

    const data = await readData();

    // 대댓글 필터링
    const replies = data.comments.filter(
      (comment) =>
        comment.postId === id && comment.parentCommentId === commentId
    );

    // 커서 기반 페이지네이션 적용
    let startIndex = 0;
    if (cursor) {
      startIndex = replies.findIndex((reply) => reply.id === cursor) + 1;
    }

    // 다음 페이지를 위한 데이터 준비
    const paginatedReplies = replies.slice(startIndex, startIndex + limit);
    const nextCursor =
      paginatedReplies.length === limit
        ? (paginatedReplies[paginatedReplies.length - 1] as Comment).id
        : null;

    return NextResponse.json({
      data: paginatedReplies,
      nextCursor,
      hasMore: nextCursor !== null,
    });
  } catch (error) {
    console.error('Failed to fetch replies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch replies' },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /posts/{id}/comments/{commentId}/replies:
 *   post:
 *     tags: ['Replies']
 *     summary: 대댓글 작성
 *     parameters:
 *       - in: path
 *         name: id
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDTO'
 *     responses:
 *       200:
 *         description: 대댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const { id, commentId } = await params;
    const body: CreateCommentDTO = await request.json();
    const data = await readData();

    // 부모 댓글이 존재하는지 확인
    const parentComment = data.comments.find(
      (comment) => comment.id === commentId && comment.postId === id
    );

    if (!parentComment) {
      return NextResponse.json(
        { error: 'Parent comment not found' },
        { status: 404 }
      );
    }

    const newReply: Comment = {
      id: Date.now().toString(),
      postId: id,
      parentCommentId: commentId,
      content: body.content,
      author: body.author,
      createdAt: new Date().toISOString(),
    };

    data.comments.unshift(newReply);
    await writeData(data);

    return NextResponse.json(newReply);
  } catch (error) {
    console.error('Failed to create reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    );
  }
}
