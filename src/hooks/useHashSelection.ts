import { useCallback, useEffect, useState } from 'react';

export function useHashSelection<T>(items: T[], getId: (item: T) => string) {
  const [selected, setSelected] = useState<T | null>(null);

  const resolveSelection = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const hash = window.location.hash.slice(1);
    if (!hash) {
      return null;
    }

    return items.find(item => getId(item) === hash) ?? null;
  }, [items, getId]);

  useEffect(() => {
    setSelected(resolveSelection());
  }, [resolveSelection]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleHashChange = () => {
      setSelected(resolveSelection());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [resolveSelection]);

  const clearSelection = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const urlWithoutHash = window.location.pathname + window.location.search;
    window.history.replaceState(null, window.document.title, urlWithoutHash);
    setSelected(null);
  }, []);

  return { selected, clearSelection };
}
