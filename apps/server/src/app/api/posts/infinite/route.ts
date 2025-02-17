import { NextRequest, NextResponse } from 'next/server';

import { GetPostsCursor } from '@/types';
import { readData } from '@/utils';

const DEFAULT_LIMIT = 10;

/**
 * @swagger
 * /posts/infinite:
 *   get:
 *     tags: ['Posts']
 *     summary: 게시글 목록 조회 (커서 기반 페이지네이션)
 *     description: 커서 기반 페이지네이션을 사용하여 게시글 목록을 조회합니다
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *           default: ''
 *         description: 다음 조회를 위한 커서 (마지막 게시글의 ID)<br/>빈 문자열일 경우 첫 번째 게시글(인덱스 0)부터 조회됩니다
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 한 페이지당 게시글 수
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostCursorPaginationResponse'
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
  request: NextRequest
): Promise<NextResponse<GetPostsCursor> | NextResponse<{ error: string }>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
    const cursor = searchParams.get('cursor') || '';

    const data = await readData();
    const cursorIndex = cursor
      ? data.posts.findIndex((post) => post.id === cursor)
      : -1;

    const startIndex = cursorIndex + 1;
    const posts = data.posts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: posts,
      nextCursor: posts.length === limit ? posts[posts.length - 1]!.id : null,
      hasMore: startIndex + limit < data.posts.length,
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
