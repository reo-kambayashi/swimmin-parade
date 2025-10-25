import React, { useState, useEffect } from 'react';

export default function MemberModal({ members }) {
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const member = members.find(m => m.id === hash);
      setActiveMember(member);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [members]);

  const closeModal = () => {
    window.location.hash = '';
  };

  useEffect(() => {
    if (activeMember) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [activeMember]);

  if (!activeMember) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 pt-12 sm:items-center sm:p-10"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2rem] border border-white/60 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.25)] sm:max-h-[85vh] sm:p-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col items-center space-y-5">
          <img src={activeMember.photo} alt={activeMember.name} className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg sm:h-44 sm:w-44" loading="lazy" decoding="async" />
          <div className="text-center">
            <h2 className="text-3xl font-bold font-heading text-text sm:text-4xl">{activeMember.name}</h2>
            <p className="mt-2 text-lg text-primary sm:text-xl">{activeMember.role}</p>
          </div>
          <p className="w-full max-w-xl text-sm leading-relaxed text-text/80 sm:text-base">{activeMember.bio}</p>
        </div>
        <button onClick={closeModal} className="focus-ring absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-text transition-colors duration-300 hover:bg-black/20" aria-label="モーダルを閉じる">
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
        <div className="mt-6 flex flex-col items-center gap-3 text-xs text-text/60 sm:flex-row sm:justify-between sm:text-sm">
          <button onClick={closeModal} className="text-primary underline-offset-4 transition-colors duration-200 hover:underline">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
