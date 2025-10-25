const baseClass = 'btn-pill btn-float focus-ring';

export const releaseLinkVariants = {
  primary: `${baseClass} bg-primary text-white hover:bg-primary/90`,
  secondary: `${baseClass} border border-primary/30 text-text hover:border-primary/60`
} as const;

export type ReleaseLinkVariant = keyof typeof releaseLinkVariants;

export const getReleaseLinkClass = (variant: ReleaseLinkVariant) => releaseLinkVariants[variant];
