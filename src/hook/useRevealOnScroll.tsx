import { useEffect, useState, useRef } from 'react';

export default function useRevealOnScroll(threshold = 0.1, rootMargin = '0px') {
  const [isRevealed, setIsRevealed] = useState(false);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    if (revealRef.current) {
      observer.observe(revealRef.current);
    }

    return () => {
      if (revealRef.current) {
        observer.unobserve(revealRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return { isRevealed, revealRef };
}
