'use client';

import { useEffect, useState } from 'react';

import { SubmitButton } from '@/src/shared/ui/submit-button';

import { responseComments } from '../api/comment';
import { Comment } from '../types';
import { CommentItem } from './comment-item';

export function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  useEffect(() => {
    async function getComment() {
      try {
        const savedComments = await responseComments('1');
        console.log('📌 API 응답:', savedComments);
        setComments(savedComments.data);
      } catch (error) {
        console.error('❌ 댓글 데이터를 가져오는 중 오류 발생:', error);
      }
    }
    getComment();
  }, []);

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <div className="flex min-h-[40svh] flex-col items-center justify-center">
      <div className="flex w-4/5 flex-col justify-center gap-4">
        <p>Comments</p>
        <textarea className="max-h-[30vh] min-h-[15vh] w-full max-w-[150svh] resize-none rounded-lg border-2 border-black" />
        <SubmitButton className="min-h-[45px] w-[5%] min-w-[150px] rounded-lg bg-black text-white">
          Submit Button
        </SubmitButton>
      </div>
      <div>
        {currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <div
              key={comment.id}
              className="mb-2 rounded-lg border-2 border-black p-4"
            >
              <CommentItem
                id={comment.id}
                postId={comment.postId}
                author={comment.author}
                content={comment.content}
                createdAt={comment.createdAt}
              />
            </div>
          ))
        ) : (
          <p>No Comments Available</p>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`rounded border px-3 py-1 ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}
