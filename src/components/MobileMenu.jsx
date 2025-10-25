import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/mv', label: 'MV' },
  { href: '/releases', label: 'Releases' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const openAnimationFrame = useRef(null);

  const closeMenu = useCallback(() => {
    if (openAnimationFrame.current !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(openAnimationFrame.current);
      openAnimationFrame.current = null;
    }
    setIsOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setIsVisible(true);
    if (typeof window === 'undefined') {
      setIsOpen(true);
      return;
    }

    openAnimationFrame.current = window.requestAnimationFrame(() => {
      setIsOpen(true);
      openAnimationFrame.current = null;
    });
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen && isVisible) {
      const timer = window.setTimeout(() => {
        setIsVisible(false);
      }, 250);

      return () => {
        window.clearTimeout(timer);
      };
    }

    if (isOpen) {
      setIsVisible(true);
    }

    return undefined;
  }, [isOpen, isVisible]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  useEffect(
    () => () => {
      if (openAnimationFrame.current !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(openAnimationFrame.current);
      }
    },
    [],
  );

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className={`relative flex h-full flex-col overflow-y-auto px-5 py-6 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-6 scale-95 opacity-0'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <a href="/" className="text-xl font-bold font-heading text-text">
            swimmin' parade
          </a>
          <button
            onClick={closeMenu}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-text transition-colors duration-300"
            aria-label="メニューを閉じる"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li
              key={item.href}
              className={`transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${index * 60 + 120}ms` : '0ms' }}
            >
              <a
                href={item.href}
                className="focus-ring block rounded-3xl bg-white/90 py-4 text-center text-lg font-semibold text-text shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-12 text-center text-sm text-text/70">© {new Date().getFullYear()} swimmin&apos; parade</div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
        className={`group focus-ring relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
          isOpen
            ? 'border-primary bg-primary/10 text-primary shadow-sm'
            : 'border-primary/20 bg-white/70 text-text hover:border-primary/40 hover:bg-white'
        }`}
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
        aria-pressed={isOpen}
      >
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ease-out ${
            isOpen ? 'scale-100 opacity-100 bg-primary/20' : 'scale-75 opacity-0 bg-primary/10'
          }`}
        />
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span
            aria-hidden
            className={`absolute block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out ${
              isOpen ? 'translate-y-0 rotate-45' : '-translate-y-2 group-hover:-translate-y-[9px]'
            }`}
          />
          <span
            aria-hidden
            className={`absolute block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out ${
              isOpen ? 'scale-x-0 opacity-0' : 'opacity-100 group-hover:scale-x-110'
            }`}
          />
          <span
            aria-hidden
            className={`absolute block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ease-out ${
              isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2 group-hover:translate-y-[9px]'
            }`}
          />
        </span>
      </button>
      {isMounted && isVisible ? createPortal(menuOverlay, document.body) : null}
    </div>
  );
}
