export type NavigationItem = {
  href: string;
  label: string;
};

export const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home' },
  { href: '/members', label: 'Members' },
  { href: '/mv', label: 'MV' },
  { href: '/releases', label: 'Releases' },
  { href: '/contact', label: 'Contact' },
];
