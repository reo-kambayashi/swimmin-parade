import React, { useState, useEffect } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/releases', label: 'Releases' },
  { href: '/contact', label: 'Contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-text transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="メニューを開く"
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
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(219,234,254,0.8),rgba(191,219,254,0.6))]" aria-hidden="true"></div>
          <div className="relative flex h-full flex-col overflow-y-auto px-5 py-6">
            <div className="mb-10 flex items-center justify-between">
              <a href="/" className="text-xl font-bold font-heading text-text">swimmin' parade</a>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/70 text-text transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
                    className="block rounded-3xl bg-white/90 py-4 text-center text-lg font-semibold text-text shadow-pop transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-12 text-center text-sm text-text/70">
              © {new Date().getFullYear()} swimmin&apos; parade
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
