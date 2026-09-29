import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../components/layouts/MainLayout';
import { HomePage } from '../modules/home/pages/HomePage';
import { AboutPage } from '../modules/about/pages/AboutPage';
import { NotFoundPage } from './NotFoundPage';
import { PATHS } from './paths';

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: PATHS.notFound, element: <NotFoundPage /> },
    ],
  },
]);
