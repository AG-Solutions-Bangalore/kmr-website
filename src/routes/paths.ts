export const PATHS = {
  home: '/',
  about: '/about',
  contact: '/contact',
  blog: '/blog',
  blogDetail: '/blog/:slug',
  notFound: '*',
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];
