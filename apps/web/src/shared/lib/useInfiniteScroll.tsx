import { useEffect, useRef } from 'react';

export function useInfiniteScroll<T extends HTMLDivElement>(
  fetchData: () => Promise<void>,
  {
    threshold,
    root,
    rootMargin,
  }: { threshold: number; root?: Element | Document; rootMargin?: string }
) {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchData();
        }
      },
      { threshold, root, rootMargin }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchData, threshold, root, rootMargin, targetRef]);

  return { targetRef };
}
