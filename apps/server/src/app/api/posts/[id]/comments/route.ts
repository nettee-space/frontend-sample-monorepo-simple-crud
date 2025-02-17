import { NextRequest, NextResponse } from 'next/server';

import { Comment, CreateCommentDTO } from '@/types';
import { getReplyCount, readData, writeData } from '@/utils';

/**
 * @swagger
 * /posts/{id}/comments:
 *   get:
 *     tags: ['Comments']
 *     summary: 게시글의 댓글 목록 조회 (오프셋 페이지네이션)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글을 조회할 게시글의 ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: 페이지 번호
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: 페이지당 항목 수
 *         default: 10
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentOffsetPaginationResponse'
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
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const data = await readData();

    // 게시글 존재 여부 확인
    const postExists = data.posts.some((post) => post.id === id);
    if (!postExists) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 부모 댓글만 필터링
    const parentComments = data.comments.filter(
      (c) => c.postId === id && !c.parentCommentId
    );

    // 페이지네이션 계산
    const startIndex = (page - 1) * limit;
    const paginatedComments = parentComments.slice(
      startIndex,
      startIndex + limit
    );

    // 대댓글 수 계산 및 결과 매핑
    const commentsWithReplyCount = paginatedComments.map((comment) => ({
      ...comment,
      replyCount: getReplyCount(data.comments, comment.id),
    }));

    return NextResponse.json({
      data: commentsWithReplyCount,
      currentPage: page,
      totalPages: Math.ceil(parentComments.length / limit),
      hasMore: startIndex + limit < parentComments.length,
    });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    const errorMessage = 'Failed to fetch comments';
    const statusCode = 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     tags: ['Comments']
 *     summary: 새 댓글 작성
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글을 작성할 게시글의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCommentDTO'
 *     responses:
 *       200:
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
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
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body: CreateCommentDTO = await request.json();
    const data = await readData();
    const { id } = await params;

    const newComment: Comment = {
      id: Date.now().toString(),
      postId: id,
      ...body,
      createdAt: new Date().toISOString(),
    };

    data.comments.unshift(newComment);
    await writeData(data);

    return NextResponse.json(newComment);
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
