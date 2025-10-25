export type Member = {
  id: string; // slug
  name: string;
  role: string; // e.g., Vocal/Gt
  photo: string; // /images/members/xxx.jpg
  bio?: string;
  socials?: { instagram?: string; x?: string; site?: string };
};

export const members: Member[] = [
  { id: 'reo-kambayashi', name: '神林励旺', role: 'Vocal/Guitar', photo: '/images/members/reo.jpg', bio: 'ギターボーカル。' },
  { id: 'goru-kato', name: '加藤豪流', role: 'Guitar', photo: '/images/members/goru.jpg', bio: 'ギター。' },
  { id: 'kanato-kurosawa', name: '黒沢奏登', role: 'Bass', photo: '/images/members/kanato.jpg', bio: 'ベース。' },
  { id: 'sohei-nagase', name: '長瀬颯平', role: 'Drums', photo: '/images/members/sohei.jpg', bio: 'ドラム。' },
];
