export type Track = { no: number; title: string; length?: string };

export type Release = {
  id: string; // slug
  title: string;
  year: number;
  type: 'Album' | 'EP' | 'Single';
  cover: string; // /images/releases/xxx.jpg
  embed?: { spotify?: string; youtube?: string; subscription?: string };
  links?: { spotify?: string; apple?: string; bandcamp?: string; youtube?: string; subscription?: string };
  tracks?: Track[];
  credits?: string[];
  isLatest?: boolean;
};

export const releases: Release[] = [
  {
    id: 'latest-single',
    title: '世界は僕らをおいて',
    year: 2024,
    type: 'EP',
    cover: '/images/releases/latest-single.png',
    embed: {
      subscription: 'https://linkcloud.mu/2cd4e67c'
    },
    links: {
      youtube: 'https://youtube.com/playlist?list=OLAK5uy_kEQMDHB_sldwEfYEvdJz7nENO8mCuZWqM&si=Ec2d_w5JIjN9tKD2',
      subscription: 'https://linkcloud.mu/2cd4e67c'
    },
    tracks: [
      { no: 1, title: '綴る、この日の青空へ' },
      { no: 2, title: 'Sunny Side Road' },
      { no: 3, title: '鼓動' },
      { no: 4, title: '世界は僕らをおいて' }
    ],
    isLatest: true
  }
];
