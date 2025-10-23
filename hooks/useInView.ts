import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

// Fix: Made the hook generic to allow the ref to be attached to different HTML element types.
export const useInView = <T extends HTMLElement>(options: UseInViewOptions = {}): { ref: RefObject<T>; inView: boolean } => {
  const { threshold = 0.1, triggerOnce = false } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else {
            if (!triggerOnce) {
                 setInView(false);
            }
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, triggerOnce]);

  return { ref, inView };
};