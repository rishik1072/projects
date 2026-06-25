import { useEffect, useState } from 'react';

export function useScrollState(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      setIsScrolled(window.scrollY > threshold);
      frameId = 0;
    };

    const onScroll = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [threshold]);

  return isScrolled;
}
