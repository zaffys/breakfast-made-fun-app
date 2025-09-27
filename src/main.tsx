import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { Layout } from '@/components/Layout';
import RecipeListingPage from '@/pages/RecipeListingPage';
import RecipeDetailPage from '@/pages/RecipeDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import SearchResultsPage from '@/pages/SearchResultsPage';
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/category/:categoryName", element: <RecipeListingPage /> },
      { path: "/recipe/:recipeId", element: <RecipeDetailPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/search", element: <SearchResultsPage /> },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)