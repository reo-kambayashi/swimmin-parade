import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.classList.toggle('overflow-hidden', isLocked);

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isLocked]);
}
