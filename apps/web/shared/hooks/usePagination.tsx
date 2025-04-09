import { useMemo } from 'react';

export function usePagination(
  currentPage: number,
  totalPages: number,
  setPage: (page: number) => void
) {
  const maxPageButtons = 5;
  const currentGroup = Math.floor((currentPage - 1) / maxPageButtons);
  const startPage = currentGroup * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const paginationButtons = useMemo(
    () =>
      [
        { label: '<<', page: 1, isNav: true, disabled: currentPage === 1 },
        {
          label: '<',
          page: Math.max(startPage - 1, 1),
          isNav: true,
          disabled: currentPage === 1,
        },
        ...Array.from({ length: endPage - startPage + 1 }).map((_, idx) => ({
          label: (startPage + idx).toString(),
          page: startPage + idx,
          isNav: false,
          disabled: currentPage === startPage + idx,
        })),
        {
          label: '>',
          page: Math.min(startPage + maxPageButtons, totalPages),
          isNav: true,
          disabled: currentPage === totalPages,
        },
        {
          label: '>>',
          page: totalPages,
          isNav: true,
          disabled: currentPage === totalPages,
        },
      ].map(({ label, page, isNav, disabled }) => (
        <button
          key={label}
          onClick={() => !disabled && setPage(page)}
          disabled={disabled}
          className={`rounded-md border px-3 py-1 transition ${
            disabled
              ? isNav
                ? 'text-gray-400' // <<, <, >, >> 버튼이 비활성화되면 글씨만 회색
                : 'bg-gray-900 text-white underline' // 페이지 번호 버튼이 비활성화되면 배경 변경
              : currentPage === page
                ? 'bg-black font-bold text-white underline' // 현재 페이지 버튼 스타일
                : 'bg-white hover:bg-gray-100' // 기본 버튼 스타일
          }`}
        >
          {label}
        </button>
      )),
    [currentPage, endPage, setPage, startPage, totalPages]
  );

  return { paginationButtons, goToPage: setPage };
}
