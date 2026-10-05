import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../components/layouts/MainLayout';
import { HomePage } from '../modules/home/pages/HomePage';
import { AboutPage } from '../modules/about/pages/AboutPage';
import { ContactPage } from '../modules/contact/pages/ContactPage';
import { BlogDetailPage, BlogsPage } from '../modules/blog';
import { NotFoundPage } from './NotFoundPage';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <BlogsPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: PATHS.notFound, element: <NotFoundPage /> },
    ],
  },
]);
