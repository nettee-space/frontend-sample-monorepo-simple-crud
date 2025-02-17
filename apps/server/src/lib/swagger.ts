import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Nettee Sample API',
        version: '1.0',
      },
      servers: [
        {
          url: 'http://localhost:4000/api',
          description: 'Local server',
        },
      ],
      tags: [
        {
          name: 'Posts',
          description: '게시글 관련 API',
        },
        {
          name: 'Comments',
          description: '댓글 관련 API',
        },
        {
          name: 'Replies',
          description: '대댓글 관련 API',
        },
      ],
      components: {
        schemas: {
          Post: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '게시글 ID',
              },
              title: {
                type: 'string',
                description: '게시글 제목',
              },
              content: {
                type: 'string',
                description: '게시글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: '생성 시간',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: '수정 시간',
                nullable: true,
              },
            },
          },
          Comment: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '댓글 ID',
              },
              postId: {
                type: 'string',
                description: '게시글 ID',
              },
              content: {
                type: 'string',
                description: '댓글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: '생성 시간',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: '수정 시간',
                nullable: true,
              },
              parentCommentId: {
                type: 'string',
                description: '부모 댓글 ID (대댓글인 경우)',
                nullable: true,
              },
              replyCount: {
                type: 'number',
                description: '대댓글 수',
                nullable: true,
              },
            },
          },
          CreatePostDTO: {
            type: 'object',
            required: ['title', 'content', 'author'],
            properties: {
              title: {
                type: 'string',
                description: '게시글 제목',
              },
              content: {
                type: 'string',
                description: '게시글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          UpdatePostDTO: {
            type: 'object',
            required: ['title', 'content', 'author'],
            properties: {
              title: {
                type: 'string',
                description: '게시글 제목',
              },
              content: {
                type: 'string',
                description: '게시글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          CreateCommentDTO: {
            type: 'object',
            required: ['content', 'author'],
            properties: {
              content: {
                type: 'string',
                description: '댓글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          UpdateCommentDTO: {
            type: 'object',
            required: ['content', 'author'],
            properties: {
              content: {
                type: 'string',
                description: '댓글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          CreateReplyDTO: {
            type: 'object',
            required: ['content', 'author'],
            properties: {
              content: {
                type: 'string',
                description: '대댓글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          UpdateReplyDTO: {
            type: 'object',
            required: ['content', 'author'],
            properties: {
              content: {
                type: 'string',
                description: '대댓글 내용',
              },
              author: {
                type: 'string',
                description: '작성자',
              },
            },
          },
          PostCursorPaginationResponse: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Post',
                },
              },
              nextCursor: {
                type: 'string',
                nullable: true,
                description: '다음 페이지 커서',
              },
              hasMore: {
                type: 'boolean',
                description: '추가 데이터 존재 여부',
              },
            },
          },
          PostOffsetPaginationResponse: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Post',
                },
              },
              currentPage: {
                type: 'number',
                description: '현재 페이지',
              },
              totalPages: {
                type: 'number',
                description: '전체 페이지 수',
              },
              hasMore: {
                type: 'boolean',
                description: '추가 페이지 존재 여부',
              },
            },
          },
          CommentOffsetPaginationResponse: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Comment',
                },
              },
              currentPage: {
                type: 'number',
                description: '현재 페이지',
              },
              totalPages: {
                type: 'number',
                description: '전체 페이지 수',
              },
              hasMore: {
                type: 'boolean',
                description: '추가 페이지 존재 여부',
              },
            },
          },
          ReplyCursorPaginationResponse: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Comment',
                },
              },
              nextCursor: {
                type: 'string',
                nullable: true,
                description: '다음 페이지 커서',
              },
              hasMore: {
                type: 'boolean',
                description: '추가 데이터 존재 여부',
              },
            },
          },
        },
      },
    },
  });
  return spec;
};
