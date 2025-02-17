import { NextRequest, NextResponse } from 'next/server';

import { GetPostsOffset } from '@/types';
import { readData } from '@/utils';

const DEFAULT_LIMIT = 10;

/**
 * @swagger
 * /posts/paginated:
 *   get:
 *     tags: ['Posts']
 *     summary: 게시글 목록 조회 (오프셋 기반 페이지네이션)
 *     description: 오프셋 기반 페이지네이션을 사용하여 게시글 목록을 조회합니다
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 조회할 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: 한 페이지당 게시글 수
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostOffsetPaginationResponse'
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
): Promise<NextResponse<GetPostsOffset> | NextResponse<{ error: string }>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;
    const page = Number(searchParams.get('page')) || 1;

    const data = await readData();
    const offset = (page - 1) * limit;

    return NextResponse.json({
      data: data.posts.slice(offset, offset + limit),
      currentPage: page,
      totalPages: Math.ceil(data.posts.length / limit),
      hasMore: offset + limit < data.posts.length,
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
