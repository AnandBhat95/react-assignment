import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

import App from './App';
import Landing from './pages/landing/Landing';
import Categories from './pages/categories/Categories';
import CategoryMeals from './pages/CategoryMeals';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';  // Import the PrivateRoute component
import AreaMeals from './pages/AreaMeals';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/login',
        element: <Login />, 
      },
      {
        path: '/categories/:categoryName',
        element:   <CategoryMeals />
      },
      {
        path: '/areas/:areaName',
        element:( <PrivateRoute><AreaMeals /></PrivateRoute>)
      },
      {
        path: 'game',
        element: (
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        ),      
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: () => ({
            body: {
              backgroundImage: 'linear-gradient(135deg,rgb(244, 245, 246),rgb(142, 195, 238))', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              margin: 0,
              padding: 0,
              fontFamily: 'sans-serif',
            },
          }),
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
