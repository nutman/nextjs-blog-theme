// Constants for routes used in the application
export type Route = {
  path: string;
  name: string;
};

export const routes = {
  home: {
    path: '/',
    name: 'Home',
  },
  blog: {
    path: '/blog',
    name: 'Blog',
  },
  projects: {
    path: '/projects',
    name: 'Projects',
  },
  about: {
    path: '/about',
    name: 'About',
  },
};
