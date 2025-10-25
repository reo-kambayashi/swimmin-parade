export type Track = { no: number; title: string; length?: string };

export type Release = {
  id: string; // slug
  title: string;
  year: number;
  type: 'Album' | 'EP' | 'Single';
  cover: string; // /images/releases/xxx.jpg
  embed?: { spotify?: string; youtube?: string };
  links?: { spotify?: string; apple?: string; bandcamp?: string; youtube?: string };
  tracks?: Track[];
  credits?: string[];
  isLatest?: boolean;
};

export const releases: Release[] = [
  {
    id: 'latest-single',
    title: '（曲名未定）',
    year: 2025,
    type: 'Single',
    cover: '/images/releases/latest-single.jpg',
    embed: { youtube: 'https://youtu.be/4aaufut-Uww?si=6WRR6nDznC9BXo38' },
    links: {
      youtube: 'https://youtu.be/4aaufut-Uww?si=6WRR6nDznC9BXo38'
      // 他プラットフォームは LinkCloud: https://linkcloud.mu/2cd4e67c
    },
    isLatest: true
  }
];
