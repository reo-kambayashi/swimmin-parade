import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/releases', label: 'Releases' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-50 bg-white transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className={`relative flex h-full flex-col overflow-y-auto px-5 py-6 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-2'}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <a href="/" className="text-xl font-bold font-heading text-text">
            swimmin' parade
          </a>
          <button
            onClick={() => setIsOpen(false)}
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
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="focus-ring block rounded-3xl bg-white/90 py-4 text-center text-lg font-semibold text-text shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                onClick={() => setIsOpen(false)}
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
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            setIsVisible(true);
            setIsOpen(true);
          }
        }}
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-text transition-colors duration-300"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
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
          className="lucide lucide-menu"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>
      {isMounted && isVisible ? createPortal(menuOverlay, document.body) : null}
    </div>
  );
}
