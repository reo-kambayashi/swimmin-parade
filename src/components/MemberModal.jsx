import React, { useCallback } from 'react';
import ModalFrame from './ModalFrame';
import { useHashSelection } from '../hooks/useHashSelection';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export default function MemberModal({ members }) {
  const getMemberId = useCallback(member => member.id, []);
  const { selected: activeMember, clearSelection } = useHashSelection(members, getMemberId);
  useBodyScrollLock(Boolean(activeMember));

  if (!activeMember) {
    return null;
  }

  return (
    <ModalFrame
      isOpen={Boolean(activeMember)}
      onClose={clearSelection}
      panelClassName="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[2rem] border border-white/60 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.25)] sm:max-h-[85vh] sm:p-10"
      labelledBy="member-modal-title"
    >
      <div className="flex flex-col items-center space-y-5">
        <img
          src={activeMember.photo}
          alt={activeMember.name}
          className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg sm:h-44 sm:w-44"
          loading="lazy"
          decoding="async"
        />
        <div className="text-center">
          <h2 id="member-modal-title" className="text-3xl font-bold font-heading text-text sm:text-4xl">
            {activeMember.name}
          </h2>
          <p className="mt-2 text-lg text-primary sm:text-xl">{activeMember.role}</p>
        </div>
        <p className="w-full max-w-xl text-sm leading-relaxed text-text/80 sm:text-base">{activeMember.bio}</p>
      </div>
      <button
        onClick={clearSelection}
        className="focus-ring absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-text transition-colors duration-300 hover:bg-black/20"
        aria-label="モーダルを閉じる"
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
      <div className="mt-6 flex flex-col items-center gap-3 text-xs text-text/60 sm:flex-row sm:justify-between sm:text-sm">
        <button onClick={clearSelection} className="text-primary underline-offset-4 transition-colors duration-200 hover:underline">
          閉じる
        </button>
      </div>
    </ModalFrame>
  );
}
