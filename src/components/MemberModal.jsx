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

  if (!activeMember) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={closeModal}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full m-4" onClick={e => e.stopPropagation()}>
        <img src={activeMember.photo} alt={activeMember.name} className="w-48 h-48 rounded-full mx-auto mb-6 object-cover" />
        <h2 className="text-4xl font-bold text-center font-heading">{activeMember.name}</h2>
        <p className="text-primary text-center text-xl mb-4">{activeMember.role}</p>
        <p className="text-center">{activeMember.bio}</p>
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="Close modal">
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
    </div>
  );
}
