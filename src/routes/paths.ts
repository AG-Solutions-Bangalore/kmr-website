export const PATHS = {
  home: '/',
  about: '/about',
  notFound: '*',
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];
