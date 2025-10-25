import React, { useState, useEffect } from 'react';

export default function ReleaseModal({ releases }) {
  const [activeRelease, setActiveRelease] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const release = releases.find(r => r.id === hash);
      setActiveRelease(release);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [releases]);

  useEffect(() => {
    if (activeRelease) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MusicRelease',
        'name': activeRelease.title,
        'byArtist': {
          '@type': 'MusicGroup',
          'name': "swimmin' parade"
        },
        'datePublished': activeRelease.year,
        'releaseType': activeRelease.type,
        'url': `${window.location.origin}/releases#${activeRelease.id}`,
        'image': `${window.location.origin}${activeRelease.cover}`
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [activeRelease]);

  const closeModal = () => {
    window.location.hash = '';
  };

  if (!activeRelease) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-8">
          <img src={activeRelease.cover} alt={activeRelease.title} className="w-full rounded-lg shadow-md" />
          <div>
            <h2 className="text-3xl font-bold font-heading mb-2">{activeRelease.title}</h2>
            <p className="text-lg mb-4">{activeRelease.year} &bull; {activeRelease.type}</p>
            {activeRelease.embed?.youtube && (
              <div className="relative mb-4 overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={activeRelease.embed.youtube.replace('watch?v=', 'embed/')}
                  title={activeRelease.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                ></iframe>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
                {activeRelease.links?.youtube && <a href={activeRelease.links.youtube} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">YouTube</a>}
            </div>
          </div>
        </div>
        <button onClick={closeModal} className="absolute top-4 right-4 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors" aria-label="Close modal">
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
