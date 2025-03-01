import { useEffect, useRef } from 'react';
function useCustomRef<T>() {
  return useRef<T | null>(null);
}
export function useInfiniteScroll(
  fetchData: () => Promise<void>,
  {
    threshold,
    root,
    rootMargin,
  }: { threshold: number; root?: Element | Document; rootMargin?: string }
) {
  const targetRef = useCustomRef<HTMLDivElement>();

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchData();
        }
      },
      { threshold: threshold, root: root, rootMargin: rootMargin }
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
