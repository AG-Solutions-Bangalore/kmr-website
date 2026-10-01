export const PATHS = {
  home: '/',
  about: '/about',
  contact: '/contact',
  notFound: '*',
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];
