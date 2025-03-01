import { useEffect, useRef } from 'react';

export function useInfiniteScroll(fetchData: () => Promise<void>) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchData]);

  return { targetRef };
}
