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
      document.body.classList.add('overflow-hidden');
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
        document.body.classList.remove('overflow-hidden');
      };
    }
    document.body.classList.remove('overflow-hidden');
  }, [activeRelease]);

  const closeModal = () => {
    window.location.hash = '';
  };

  if (!activeRelease) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 pt-12 sm:items-center sm:p-10"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/60 bg-white p-6 shadow-[0_40px_90px_rgba(15,23,42,0.25)] sm:p-10"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
          <img src={activeRelease.cover} alt={activeRelease.title} className="w-full rounded-[1.75rem] border border-primary/10 bg-white/80 p-4 shadow-lg" loading="lazy" decoding="async" />
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-heading text-text sm:text-3xl">{activeRelease.title}</h2>
            <p className="text-base text-text/80 sm:text-lg">{activeRelease.year} &bull; {activeRelease.type}</p>
            {activeRelease.embed?.subscription ? (
              <div className="relative mb-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-inner" style={{ minHeight: '420px' }}>
                <iframe
                  src={activeRelease.embed.subscription}
                  title={`${activeRelease.title} subscription`}
                  allow="autoplay; encrypted-media"
                  className="absolute inset-0 h-full w-full"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                ></iframe>
              </div>
            ) : (
              activeRelease.embed?.youtube && (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-inner" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={activeRelease.embed.youtube.replace('watch?v=', 'embed/')}
                    title={activeRelease.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  ></iframe>
                </div>
              )
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {activeRelease.links?.subscription && (
                <a
                  href={activeRelease.links.subscription}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-float focus-ring border border-primary/30 bg-white px-6 py-3 text-sm text-primary duration-200 hover:border-primary/50 sm:text-base"
                >
                  Subscription
                </a>
              )}
              {activeRelease.links?.youtube && (
                <a
                  href={activeRelease.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-float focus-ring bg-red-600 px-6 py-3 text-sm text-white duration-200 hover:bg-red-700 sm:text-base"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={closeModal}
          className="focus-ring absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-text transition-colors duration-200 hover:bg-black/20"
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
        <div className="mt-6 flex flex-col gap-3 text-xs text-text/60 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <span>画面をタップするとモーダルを閉じられます。モバイルでは上下にスクロールできます。</span>
          <button onClick={closeModal} className="text-primary underline-offset-4 transition-colors duration-200 hover:underline">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
